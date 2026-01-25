import { TransactionStatisticsService } from "./transactionStatistics.service";
import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

// Mock prisma
jest.mock("../config/database", () => ({
  prisma: {
    transaction: {
      aggregate: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn(),
    },
  },
}));

// Mock BudgetService
jest.mock("./budget.service", () => {
  return {
    BudgetService: jest.fn().mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: 1000,
        categoryBudgets: {},
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

  it("should use groupBy for current month expenses by category", async () => {
    const userId = "test-user";

    // Setup mocks
    // 1. income/expense aggregates and recentTransactions
    (prisma.transaction.aggregate as jest.Mock)
      .mockResolvedValueOnce({ _sum: { amount: new Prisma.Decimal(1000) } }) // income
      .mockResolvedValueOnce({ _sum: { amount: new Prisma.Decimal(500) } }); // expense

    (prisma.transaction.findMany as jest.Mock).mockResolvedValue([]); // recentTransactions

    // 2. We want to verify that groupBy IS called for categories.
    // However, the current code calls findMany for categories.
    // So we need to mock findMany return value for the CURRENT code to not crash,
    // OR just verify expected calls.
    // If we mock findMany to return empty array for the second call (categories), code works.

    // BUT, since we are testing for the NEW behavior (TDD style), we expect groupBy to be called.
    // We mock groupBy to return what we expect.
    (prisma.transaction.groupBy as jest.Mock)
      .mockResolvedValueOnce([
        { category: "Food", _sum: { amount: new Prisma.Decimal(50) } },
        { category: "Entertainment", _sum: { amount: new Prisma.Decimal(30) } },
      ]) // This will be consumed by our new code
      .mockResolvedValueOnce([]) // topExpense
      .mockResolvedValueOnce([]); // topIncome

    // We also mock findMany to return empty for the OLD code path so it doesn't crash
    // if we run this test against old code (it will just fail expectation).
    // Note: findMany is called once for recentTransactions (mocked above).
    // The second call in OLD code is for currentMonthExpensesByCategory.

    await service.getDashboardStatistics(userId);

    // Verify groupBy was called with correct parameters
    expect(prisma.transaction.groupBy).toHaveBeenCalledWith(expect.objectContaining({
      by: ["category"],
      where: expect.objectContaining({
        userId,
        type: "expense",
      }),
      _sum: { amount: true },
    }));

    // Specific check: ensure there is a call that is NOT for "top category" (which has take: 1)
    const calls = (prisma.transaction.groupBy as jest.Mock).mock.calls;
    const categoryListCall = calls.find(call => !call[0].take);

    expect(categoryListCall).toBeDefined();
  });
});
