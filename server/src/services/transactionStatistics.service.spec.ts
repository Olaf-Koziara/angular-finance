import { TransactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

// Mock prisma
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
        generalBudget: new Prisma.Decimal(1000),
        categoryBudgets: {},
      }),
    })),
  };
});

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;

  beforeEach(() => {
    service = new TransactionStatisticsService();
    jest.clearAllMocks();
  });

  it('should fetch dashboard statistics using aggregated queries', async () => {
    const userId = 'user-1';

    // Mock allTimeStats
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
      { type: 'income', _sum: { amount: new Prisma.Decimal(5000) } },
      { type: 'expense', _sum: { amount: new Prisma.Decimal(2000) } },
    ]);

    // Mock monthlyAggregates ($queryRaw call #1)
    const now = new Date();
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
       {
         month: now,
         type: 'expense',
         total: 100
       },
       {
         month: now,
         type: 'income',
         total: 200
       }
    ]);

    // Mock entertainmentAggregates ($queryRaw call #2)
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
        { month: new Date(), total: 50 }
    ]);

    // Mock currentMonthExpensesByCategory
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(100) } }
    ]);

    // Mock top categories
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([]); // Expense
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([]); // Income

    const result = await service.getDashboardStatistics(userId);

    expect(result).toBeDefined();

    // Verify queryRaw usage
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);

    // Verify output
    expect(result.financialSummary.balance).toBe(3000); // 5000 - 2000

    // Verify monthly aggregates were processed
    // In our mock, we added 100 expense and 200 income to current month.
    // Logic: monthsBuckets are initialized. The loop adds to them.
    // We need to check if result.monthlyData reflects this.
    const lastMonthData = result.monthlyData[result.monthlyData.length - 1];
    expect(lastMonthData.income).toBeGreaterThanOrEqual(200);
    expect(lastMonthData.expenses).toBeGreaterThanOrEqual(100);
  });
});
