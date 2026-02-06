import { Prisma } from "@prisma/client";
import { TransactionStatisticsService } from "./transactionStatistics.service";
import { prisma } from "../config/database";

// Mock prisma
jest.mock("../config/database", () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

// Mock BudgetService
jest.mock("./budget.service", () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: 1000,
        categoryBudgets: { Food: 500 },
      }),
    })),
  };
});

describe("TransactionStatisticsService", () => {
  let service: TransactionStatisticsService;

  beforeEach(() => {
    service = new TransactionStatisticsService();
    jest.clearAllMocks();
  });

  it("should return correct statistics (optimized)", async () => {
    const userId = "user-1";
    const now = new Date();
    // Helper to create dates relative to now
    const getDate = (monthsAgo: number) => {
       const d = new Date(now);
       d.setMonth(d.getMonth() - monthsAgo);
       return d;
    };

    // Mock groupBy for allTimeStats
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
      { type: "income", _sum: { amount: new Prisma.Decimal(5000) } },
      { type: "expense", _sum: { amount: new Prisma.Decimal(2000) } },
    ]);

    // Mock $queryRaw for monthlyStats
    (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([
        {
            month: getDate(0),
            type: 'income',
            total: 200
        },
        {
            month: getDate(0),
            type: 'expense',
            total: 100
        }
    ]);

    // Mock findMany for entertainmentTransactions
    (prisma.transaction.findMany as jest.Mock).mockResolvedValueOnce([
        {
            amount: new Prisma.Decimal(50),
            type: 'expense',
            category: 'Entertainment',
            date: getDate(1) // Last month
        }
    ]);

    // Mock groupBy for currentMonthExpensesByCategory
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(100) } }
    ]);

    // Mock groupBy for top categories (expense)
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Food', _sum: { amount: new Prisma.Decimal(50) } }
    ]);

    // Mock groupBy for top categories (income)
    (prisma.transaction.groupBy as jest.Mock).mockResolvedValueOnce([
        { category: 'Salary', _sum: { amount: new Prisma.Decimal(2000) } }
    ]);

    const result = await service.getDashboardStatistics(userId);

    expect(result).toBeDefined();
    expect(result.financialSummary.balance).toBe(3000); // 5000 - 2000

    // Verify recent transactions were processed into buckets
    // Current month bucket
    const lastBucket = result.monthlyData[result.monthlyData.length - 1];
    expect(lastBucket.income).toBe(200);
    expect(lastBucket.expenses).toBe(100);

    // Verify calls
    expect(prisma.transaction.groupBy).toHaveBeenCalledTimes(4); // allTime, currentMonth, topExp, topInc
    expect(prisma.transaction.findMany).toHaveBeenCalledTimes(1); // Only entertainment
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1); // Monthly stats
  });
});
