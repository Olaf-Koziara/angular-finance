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
    $queryRaw: jest.fn(),
  },
}));

// Mock BudgetService
jest.mock('./budget.service', () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: new Prisma.Decimal(5000),
        categoryBudgets: {},
      }),
    })),
  };
});

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TransactionStatisticsService();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should use aggregation for monthly stats and entertainment', async () => {
    // Mock date to consistent value (June 2024)
    const mockDate = new Date('2024-06-15T12:00:00Z');
    jest.useFakeTimers().setSystemTime(mockDate);

    // Mock responses
    // 1. All time stats (groupBy)
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
      { type: 'income', _sum: { amount: new Prisma.Decimal(10000) } },
      { type: 'expense', _sum: { amount: new Prisma.Decimal(5000) } },
    ]);

    // 2. $queryRaw for monthly buckets
    // Mocking return values for income/expense per month
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
      { month: new Date('2024-06-01'), type: 'income', total: 3000 },
      { month: new Date('2024-06-01'), type: 'expense', total: 1000 },
      { month: new Date('2024-05-01'), type: 'income', total: 2000 },
      { month: new Date('2024-05-01'), type: 'expense', total: 500 },
    ]);

    // 3. $queryRaw for entertainment
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
        { month: new Date('2024-03-01'), total: 100 },
        { month: new Date('2024-04-01'), total: 200 },
    ]);

    // 4. Current month expenses by category (groupBy)
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(500) } },
        { category: 'Entertainment', _sum: { amount: new Prisma.Decimal(200) } }
    ]);

    // 5 & 6. Top categories (groupBy)
    (prisma.transaction.groupBy as jest.Mock)
        .mockResolvedValueOnce([
            { category: 'Rent', _sum: { amount: new Prisma.Decimal(1000) } }
        ])
        .mockResolvedValueOnce([
            { category: 'Salary', _sum: { amount: new Prisma.Decimal(5000) } }
        ]);

    const result = await service.getDashboardStatistics('user-123');

    // Verify $queryRaw was called twice
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);

    // Verify monthly data (June)
    const june = result.monthlyData.find(m => m.month === 'DASHBOARD.MONTHS.JUN');
    expect(june).toBeDefined();
    expect(june?.income).toBe(3000);
    expect(june?.expenses).toBe(1000);

    // Verify monthly data (May)
    const may = result.monthlyData.find(m => m.month === 'DASHBOARD.MONTHS.MAY');
    expect(may).toBeDefined();
    expect(may?.income).toBe(2000);
    expect(may?.expenses).toBe(500);
  });
});
