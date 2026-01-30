import { TransactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

// Mock dependencies
jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
      aggregate: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

jest.mock('./budget.service', () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: 1000,
        categoryBudgets: { Food: 500, Entertainment: 200 },
      }),
    })),
  };
});

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let prismaMock: any;

  beforeEach(() => {
    service = new TransactionStatisticsService();
    prismaMock = prisma as any;
    jest.clearAllMocks();
  });

  it('should return correct statistics structure using mocked data', async () => {
    // Mock allTimeStats
    prismaMock.transaction.groupBy.mockResolvedValueOnce([
      { type: 'income', _sum: { amount: new Prisma.Decimal(5000) } },
      { type: 'expense', _sum: { amount: new Prisma.Decimal(2000) } },
    ]);

    const now = new Date();
    // Helper to create date relative to now (start of month)
    const getMonthStart = (monthsAgo: number) => {
        const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1, 0, 0, 0, 0);
        return d;
    };

    // Mock aggregated results (from $queryRaw)
    const aggregatedData = [
      {
        monthStart: getMonthStart(0),
        type: 'expense',
        category: 'Food',
        amount: 100,
      },
      {
        monthStart: getMonthStart(0),
        type: 'expense',
        category: 'Entertainment',
        amount: 50,
      },
       {
        monthStart: getMonthStart(0),
        type: 'income',
        category: 'Salary',
        amount: 1000,
      },
      {
        monthStart: getMonthStart(1), // Last month
        type: 'expense',
        category: 'Food',
        amount: 200,
      },
    ];

    prismaMock.$queryRaw.mockResolvedValue(aggregatedData);

    const result = await service.getDashboardStatistics('user-123');

    expect(result).toBeDefined();
    expect(result.financialSummary.balance).toBe(3000); // 5000 - 2000

    // Check specific categories
    const food = result.budgetCategories.find(c => c.name === 'DASHBOARD.CATEGORIES.FOOD');
    expect(food).toBeDefined();
    expect(food?.spent).toBe(100);
    expect(food?.budget).toBe(500);

    const entertainment = result.budgetCategories.find(c => c.name === 'DASHBOARD.CATEGORIES.ENTERTAINMENT');
    expect(entertainment).toBeDefined();
    expect(entertainment?.spent).toBe(50);
    expect(entertainment?.budget).toBe(200);

    expect(prismaMock.transaction.groupBy).toHaveBeenCalledTimes(1); // Only for allTimeStats
    expect(prismaMock.$queryRaw).toHaveBeenCalled();
  });
});
