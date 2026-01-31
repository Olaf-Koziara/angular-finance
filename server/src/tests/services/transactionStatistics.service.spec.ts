import { TransactionStatisticsService } from "../../services/transactionStatistics.service";
import { prisma } from "../../config/database";
import { BudgetService } from "../../services/budget.service";
import { Prisma } from "@prisma/client";

// Mock dependencies
jest.mock("../../config/database", () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

jest.mock("../../services/budget.service");

describe("TransactionStatisticsService", () => {
  let service: TransactionStatisticsService;
  const mockBudgetService = BudgetService as jest.MockedClass<typeof BudgetService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TransactionStatisticsService();

    // Mock BudgetService instance
    mockBudgetService.mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: new Prisma.Decimal(2000),
        categoryBudgets: { Food: 500 },
      }),
    } as any));
  });

  it("should return correct dashboard statistics", async () => {
    const userId = "user-123";

    // Mock groupBy to handle multiple calls
    (prisma.transaction.groupBy as jest.Mock).mockImplementation((args) => {
        const { by, where, orderBy } = args;

        // 1. All time stats (no date filter)
        if (by && by.includes('type') && where && !where.date) {
            return Promise.resolve([
                { type: "income", _sum: { amount: new Prisma.Decimal(5000) } },
                { type: "expense", _sum: { amount: new Prisma.Decimal(2000) } },
            ]);
        }

        // 4. Current month expenses by category (has date filter, type expense, no orderBy)
        if (by && by.includes('category') && where && where.type === 'expense' && where.date && !orderBy) {
             return Promise.resolve([
                { category: "Food", _sum: { amount: new Prisma.Decimal(100) } },
            ]);
        }

        // 5. Top Expense (type expense, has orderBy)
        if (by && by.includes('category') && where && where.type === 'expense' && orderBy) {
             return Promise.resolve([
                 { category: "Housing", _sum: { amount: new Prisma.Decimal(1000) } }
             ]);
        }

        // 6. Top Income (type income, has orderBy)
        if (by && by.includes('category') && where && where.type === 'income' && orderBy) {
             return Promise.resolve([
                 { category: "Salary", _sum: { amount: new Prisma.Decimal(3000) } }
             ]);
        }

        return Promise.resolve([]);
    });

    // Mock $queryRaw
    const now = new Date();
    // Use UTC dates for month starts
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const monthlyStatsMock = [
        { month_start: currentMonthStart, type: "expense", total_amount: 100 },
        { month_start: prevMonthStart, type: "expense", total_amount: 50 },
    ];

    const entertainmentStatsMock = [
        { month_start: prevMonthStart, total_amount: 50 },
    ];

    (prisma.$queryRaw as jest.Mock)
        .mockResolvedValueOnce(monthlyStatsMock)
        .mockResolvedValueOnce(entertainmentStatsMock);

    const result = await service.getDashboardStatistics(userId);

    expect(result).toBeDefined();
    expect(result.financialSummary.balance).toBe(3000); // 5000 - 2000

    // Verify aggregation was used
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);
    expect(prisma.transaction.findMany).not.toHaveBeenCalled();

    // Verify monthly bucket population (current month)
    const lastBucket = result.monthlyData[result.monthlyData.length - 1];
    expect(lastBucket.expenses).toBe(100);

    // Verify top categories
    expect(result.topCategories.expense).toEqual({ category: "Housing", amount: 1000 });
    expect(result.topCategories.income).toEqual({ category: "Salary", amount: 3000 });
  });
});
