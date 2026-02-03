import { TransactionStatisticsService } from "./transactionStatistics.service";
import { prisma } from "../config/database";
import { BudgetService } from "./budget.service";
import { Prisma } from "@prisma/client";

// Mock dependencies
jest.mock("../config/database", () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

jest.mock("./budget.service");

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

describe("TransactionStatisticsService", () => {
  let service: TransactionStatisticsService;
  // Mock types
  const mockPrisma = prisma as unknown as {
    transaction: {
      groupBy: jest.Mock;
      findMany: jest.Mock;
    };
    $queryRaw: jest.Mock;
  };
  const MockBudgetService = BudgetService as jest.MockedClass<typeof BudgetService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TransactionStatisticsService();

    // Default mock for BudgetService
    MockBudgetService.prototype.getBudget.mockResolvedValue({
      generalBudget: new Prisma.Decimal(5000),
      categoryBudgets: {},
      userId: "user-1",
      id: "budget-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  });

  it("should calculate dashboard statistics correctly using queryRaw (optimized)", async () => {
    const userId = "user-1";
    const now = new Date();
    // Helper to create dates
    const dateMinusMonths = (months: number) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - months);
      d.setDate(15);
      return d;
    };

    // 1. Mock allTimeStats (prisma.transaction.groupBy)
    mockPrisma.transaction.groupBy.mockResolvedValueOnce([
      { type: "income", _sum: { amount: new Prisma.Decimal(10000) } },
      { type: "expense", _sum: { amount: new Prisma.Decimal(5000) } },
    ]);

    // 2. Mock monthlyStats ($queryRaw)
    // Needs to return array of { month: Date, type: string, total: Decimal }
    const monthlyStats = [
        { month: startOfMonth(now), type: "income", total: new Prisma.Decimal(2000) },
        { month: startOfMonth(now), type: "expense", total: new Prisma.Decimal(500) },
        { month: startOfMonth(dateMinusMonths(1)), type: "expense", total: new Prisma.Decimal(120) },
    ];
    mockPrisma.$queryRaw.mockResolvedValueOnce(monthlyStats);

    // 3. Mock entertainmentStats ($queryRaw)
    // Needs to return array of { month: Date, total: Decimal }
    // Last 3 months: 120, 100, 80.
    const entertainmentStats = [
        { month: startOfMonth(dateMinusMonths(1)), total: new Prisma.Decimal(120) },
        { month: startOfMonth(dateMinusMonths(2)), total: new Prisma.Decimal(100) },
        { month: startOfMonth(dateMinusMonths(3)), total: new Prisma.Decimal(80) },
    ];
    mockPrisma.$queryRaw.mockResolvedValueOnce(entertainmentStats);

    // 4. Mock currentMonthExpensesByCategory (groupBy)
    mockPrisma.transaction.groupBy.mockResolvedValueOnce([
       { category: "Food", _sum: { amount: new Prisma.Decimal(500) } }
    ]);

    // 5. Mock top categories (groupBy x2) - Expense then Income
    mockPrisma.transaction.groupBy.mockResolvedValueOnce([
       { category: "Food", _sum: { amount: new Prisma.Decimal(500) } }
    ]);
    mockPrisma.transaction.groupBy.mockResolvedValueOnce([
       { category: "Salary", _sum: { amount: new Prisma.Decimal(2000) } }
    ]);

    const result = await service.getDashboardStatistics(userId);

    expect(result).toBeDefined();

    // Verify monthly bucket calculations (last element is current month)
    const currentBucket = result.monthlyData[result.monthlyData.length - 1];
    expect(currentBucket.income).toBe(2000);
    expect(currentBucket.expenses).toBe(500);

    // Check if findMany was NOT called
    expect(mockPrisma.transaction.findMany).not.toHaveBeenCalled();

    // Check queryRaw calls
    expect(mockPrisma.$queryRaw).toHaveBeenCalledTimes(2);
  });
});
