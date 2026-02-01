import { transactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

// Mock the database config
jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

// Mock BudgetService to return a default budget
jest.mock('./budget.service', () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: new Prisma.Decimal(2000),
        categoryBudgets: {
            'Food': 500
        }
      }),
    })),
  };
});

describe('TransactionStatisticsService', () => {
  const userId = 'user-123';
  // Use a fixed date for consistent buckets
  const mockDate = new Date('2024-06-15T00:00:00.000Z');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct statistics with mocked data (optimized parallel queries)', async () => {
    // Mock prisma.transaction.groupBy (called 4 times in Promise.all)
    // 1. All Time Stats
    // 2. Current Month Expenses By Category
    // 3. Top Expense Categories
    // 4. Top Income Categories
    (prisma.transaction.groupBy as jest.Mock)
       .mockResolvedValueOnce([
         { type: 'income', _sum: { amount: new Prisma.Decimal(10000) } },
         { type: 'expense', _sum: { amount: new Prisma.Decimal(5000) } },
       ])
       .mockResolvedValueOnce([
         { category: 'Food', _sum: { amount: new Prisma.Decimal(100) } }
       ])
       .mockResolvedValueOnce([
         { category: 'Food', _sum: { amount: new Prisma.Decimal(300) } }
       ])
       .mockResolvedValueOnce([
         { category: 'Salary', _sum: { amount: new Prisma.Decimal(2000) } }
       ]);

    // Mock prisma.$queryRaw (called 2 times in Promise.all)
    // 1. Monthly Stats
    // 2. Entertainment Stats
    (prisma.$queryRaw as jest.Mock)
      .mockResolvedValueOnce([
        // Monthly Stats Results
        // Current month (June)
        { month_start: '2024-06-01', type: 'expense', total: new Prisma.Decimal(100) },
        { month_start: '2024-06-01', type: 'income', total: new Prisma.Decimal(2000) },
        // Previous month (May)
        { month_start: '2024-05-01', type: 'expense', total: new Prisma.Decimal(50) },
      ])
      .mockResolvedValueOnce([
        // Entertainment Stats Results
        // May had 50 entertainment expense
        { month_start: '2024-05-01', total: new Prisma.Decimal(50) }
      ]);

    const stats = await transactionStatisticsService.getDashboardStatistics(userId);

    expect(stats.financialSummary.balance).toBe(5000); // 10000 - 5000

    // Check monthly data
    // Buckets are generated for 6 months ending with current month (June)
    // June should be the last bucket
    const lastBucket = stats.monthlyData[stats.monthlyData.length - 1];
    expect(lastBucket.month).toContain('JUN');
    expect(lastBucket.expenses).toBe(100);
    expect(lastBucket.income).toBe(2000);

    // Previous month (May)
    const prevBucket = stats.monthlyData[stats.monthlyData.length - 2];
    expect(prevBucket.month).toContain('MAY');
    expect(prevBucket.expenses).toBe(50);

    // Check top categories
    expect(stats.topCategories.expense?.category).toBe('Food');
    expect(stats.topCategories.income?.category).toBe('Salary');
  });
});
