import { TransactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

// Mock database
jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

// Mock BudgetService
jest.mock('./budget.service', () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: 1000,
        categoryBudgets: {
          food: 200,
          entertainment: 100
        }
      }),
    })),
  };
});

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;
  const mockUserId = 'user-123';

  beforeEach(() => {
    service = new TransactionStatisticsService();
    jest.clearAllMocks();
  });

  it('should calculate dashboard statistics correctly with aggregation queries', async () => {
    // Mock data
    const allTimeStats = [
      { type: 'income', _sum: { amount: new Prisma.Decimal(5000) } },
      { type: 'expense', _sum: { amount: new Prisma.Decimal(2000) } },
    ];

    const monthlyStats = [
      {
        month: new Date('2023-10-01'),
        type: 'income',
        total: new Prisma.Decimal(3000)
      },
      {
        month: new Date('2023-10-01'),
        type: 'expense',
        total: new Prisma.Decimal(1000)
      }
    ];

    const currentMonthExpensesByCategory = [
      { category: 'Food', _sum: { amount: new Prisma.Decimal(500) } },
      { category: 'Entertainment', _sum: { amount: new Prisma.Decimal(200) } },
    ];

    const topExpense = [
       { category: 'Rent', _sum: { amount: new Prisma.Decimal(1200) } }
    ];
    const topIncome = [
       { category: 'Salary', _sum: { amount: new Prisma.Decimal(3000) } }
    ];

    const entertainmentStats = [
      { month: new Date('2023-08-01'), total: new Prisma.Decimal(100) },
      { month: new Date('2023-09-01'), total: new Prisma.Decimal(150) },
      { month: new Date('2023-10-01'), total: new Prisma.Decimal(50) }
    ];

    // Setup mocks
    // Order:
    // 1. Promise.all([groupBy(allTime), queryRaw(monthly)])
    // 2. groupBy(currentMonthExpenses)
    // 3. Promise.all([groupBy(topExpense), groupBy(topIncome)])
    // 4. queryRaw(entertainment)

    // Note: Promise.all executions start concurrently.
    // The implementation:
    // const [allTimeStats, monthlyStats] = await Promise.all([...])

    // We can use mockResolvedValueOnce to sequence returns for the same method.
    // But since Promise.all runs them, strict ordering of calls might depend on runtime.
    // However, groupBy is called first, then queryRaw is called (initiated together).

    (prisma.transaction.groupBy as jest.Mock)
      .mockResolvedValueOnce(allTimeStats) // 1. allTimeStats
      .mockResolvedValueOnce(currentMonthExpensesByCategory) // 2. currentMonthExpensesByCategory
      .mockResolvedValueOnce(topExpense) // 3. topExpense
      .mockResolvedValueOnce(topIncome); // 4. topIncome

    (prisma.$queryRaw as jest.Mock)
      .mockResolvedValueOnce(monthlyStats) // 1. monthlyStats
      .mockResolvedValueOnce(entertainmentStats); // 2. entertainmentStats

    const result = await service.getDashboardStatistics(mockUserId);

    expect(result).toBeDefined();
    expect(result.financialSummary.balance).toBe(3000); // 5000 - 2000

    // Check if mocks were called
    expect(prisma.transaction.groupBy).toHaveBeenCalledTimes(4);
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);

    // Verify raw query calls
    const calls = (prisma.$queryRaw as jest.Mock).mock.calls;

    // console.log('Call 0 arg 0:', calls[0][0]);

    // In tagged template literals, the first argument is the array of strings.
    const sqlParts1 = calls[0][0] as string[];
    const sql1 = sqlParts1.join('');

    expect(sql1).toContain('DATE_TRUNC(\'month\', "date") as "month"');
    expect(sql1).toContain('SUM("amount") as "total"');

    const sqlParts2 = calls[1][0] as string[];
    const sql2 = sqlParts2.join('');

    expect(sql2).toContain('LOWER("category") = \'entertainment\'');
    expect(sql2).toContain('SUM("amount") as "total"');
  });
});
