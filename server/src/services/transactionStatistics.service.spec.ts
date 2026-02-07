import { Prisma } from '@prisma/client';

// 1. Mock the database config module BEFORE importing the service
jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

// 2. Mock BudgetService
const mockGetBudget = jest.fn();
jest.mock('./budget.service', () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: mockGetBudget,
    })),
  };
});

// 3. Import dependencies AFTER mocking
import { prisma } from '../config/database';
import { transactionStatisticsService } from './transactionStatistics.service';

describe('TransactionStatisticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboardStatistics', () => {
    it('should return correct statistics using aggregated queries', async () => {
      const userId = 'user-123';

      // Mock BudgetService response
      mockGetBudget.mockResolvedValue({
        generalBudget: new Prisma.Decimal(5000),
        categoryBudgets: {},
      });

      // Mock allTimeStats (groupBy type)
      (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { type: 'income', _sum: { amount: new Prisma.Decimal(10000) } },
        { type: 'expense', _sum: { amount: new Prisma.Decimal(5000) } },
      ]);

      // Mock monthly income/expense aggregation ($queryRaw)
      // Simulating result of: SELECT DATE_TRUNC('month', date) as month, type, SUM(amount) as total ...
      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      // Mock the raw query result
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
        { month: prevMonth, type: 'income', total: 2000 },
        { month: prevMonth, type: 'expense', total: 1000 },
        { month: currentMonth, type: 'income', total: 3000 },
        { month: currentMonth, type: 'expense', total: 1500 },
      ]);

      // Mock currentMonthExpensesByCategory (groupBy category)
      (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(500) } },
        { category: 'Rent', _sum: { amount: new Prisma.Decimal(1000) } },
      ]);

      // Mock top expenses (groupBy category)
      (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Rent', _sum: { amount: new Prisma.Decimal(1000) } },
      ]);

      // Mock top income (groupBy category)
      (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Salary', _sum: { amount: new Prisma.Decimal(3000) } },
      ]);

      // Mock entertainment expenses ($queryRaw)
      // Simulating result of: SELECT SUM(amount) as total FROM transactions ... GROUP BY DATE_TRUNC('month', date)
      // Simulating 2 months with entertainment expenses
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
        { total: 100 },
        { total: 200 },
      ]);

      const result = await transactionStatisticsService.getDashboardStatistics(userId);

      expect(mockGetBudget).toHaveBeenCalledWith(userId);

      // Verify calls
      // 1. allTimeStats
      expect(prisma.transaction.groupBy).toHaveBeenCalledWith(expect.objectContaining({
        by: ['type'],
        where: { userId },
        _sum: { amount: true },
      }));

      // 2. monthly aggregation ($queryRaw)
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('DATE_TRUNC')]),
        expect.anything(), // userId
        expect.anything(), // date >=
        expect.anything()  // date <
      );

      // 3. currentMonthExpensesByCategory
      expect(prisma.transaction.groupBy).toHaveBeenCalledWith(expect.objectContaining({
        by: ['category'],
        where: expect.objectContaining({
            userId,
            type: 'expense'
        }),
      }));

      // 4. entertainment expenses ($queryRaw)
      // Should be called
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);

      // Verify result structure
      expect(result.financialSummary).toBeDefined();
      expect(result.financialSummary.income).toBe(3000); // Current month income
      expect(result.financialSummary.expenses).toBe(1500); // Current month expenses
      expect(result.financialSummary.balance).toBe(5000); // 10000 - 5000 (all time)

      expect(result.trends).toBeDefined();
      expect(result.alerts).toBeDefined();
    });
  });
});
