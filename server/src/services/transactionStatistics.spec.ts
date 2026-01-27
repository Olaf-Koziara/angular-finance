import { TransactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { Prisma } from '@prisma/client';

// Mock the prisma client
jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    budget: {
      findUnique: jest.fn(),
    },
  },
}));

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;

  beforeEach(() => {
    service = new TransactionStatisticsService();
    jest.clearAllMocks();
  });

  it('should calculate statistics correctly with optimized queries', async () => {
    const userId = 'user-1';

    // Mock Budget
    (prisma.budget.findUnique as jest.Mock).mockResolvedValue({
      userId,
      generalBudget: new Prisma.Decimal(1000),
      categoryBudgets: {},
    });

    const groupByMock = prisma.transaction.groupBy as jest.Mock;
    const findManyMock = prisma.transaction.findMany as jest.Mock;

    // 1. All time stats
    groupByMock.mockResolvedValueOnce([
        { type: 'income', _sum: { amount: new Prisma.Decimal(5000) } },
        { type: 'expense', _sum: { amount: new Prisma.Decimal(2000) } },
    ]);

    // 2-7. Monthly stats (6 months)
    // We'll simulate 6 months. Let's make the last one (current) have some data.
    for (let i = 0; i < 5; i++) {
        groupByMock.mockResolvedValueOnce([]); // Empty for previous months
    }
    // Current month (last bucket)
    groupByMock.mockResolvedValueOnce([
        { type: 'income', _sum: { amount: new Prisma.Decimal(3000) } },
        { type: 'expense', _sum: { amount: new Prisma.Decimal(1000) } }
    ]);

    // 8. Current month expenses by category
    groupByMock.mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(200) } }
    ]);

    // 9. Top expenses
    groupByMock.mockResolvedValueOnce([
         { category: 'Rent', _sum: { amount: new Prisma.Decimal(1000) } }
    ]);

    // 10. Top income
    groupByMock.mockResolvedValueOnce([
         { category: 'Salary', _sum: { amount: new Prisma.Decimal(3000) } }
    ]);

    // Mock entertainment transactions (findMany)
    const now = new Date();
    const entertainmentTransactions = [
       {
         amount: new Prisma.Decimal(50),
         date: new Date(now.getFullYear(), now.getMonth() - 2, 15)
       }
    ];

    findManyMock.mockResolvedValue(entertainmentTransactions);

    const stats = await service.getDashboardStatistics(userId);

    // Assertions
    expect(stats.financialSummary.balance).toBe(3000); // 5000 - 2000
    expect(stats.financialSummary.income).toBe(3000); // Current month
    expect(stats.financialSummary.expenses).toBe(1000); // Current month

    // Verify calls
    // findMany should be called ONCE (for entertainment)
    expect(findManyMock).toHaveBeenCalledTimes(1);

    // Check arguments of findMany to ensure it's the optimized query
    const findManyArgs = findManyMock.mock.calls[0][0];
    expect(findManyArgs.where.category).toEqual({ equals: 'Entertainment', mode: 'insensitive' });
    expect(findManyArgs.where.type).toBe('expense');
    // Ensure select clause is optimized
    expect(findManyArgs.select).toEqual({ amount: true, date: true });

    // groupBy should be called 1 + 6 + 3 = 10 times
    expect(groupByMock).toHaveBeenCalledTimes(10);
  });
});
