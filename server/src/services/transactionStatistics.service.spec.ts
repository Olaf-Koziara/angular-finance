import { TransactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { BudgetService } from './budget.service';
import { Prisma } from '@prisma/client';

// Mock dependencies
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

jest.mock('./budget.service');

describe('TransactionStatisticsService', () => {
  let service: TransactionStatisticsService;

  beforeEach(() => {
    service = new TransactionStatisticsService();
    jest.clearAllMocks();
  });

  it('should calculate statistics correctly and correctly access _sum.amount', async () => {
    const userId = 'user1';

    // Mock BudgetService
    (BudgetService as any).mockImplementation(() => ({
      getBudget: jest.fn().mockResolvedValue({
        generalBudget: 1000,
        categoryBudgets: { Food: 500 },
      }),
    }));

    // Mock Prisma responses
    // We expect:
    // 1. allTimeStats (groupBy)
    // 2. monthlyAggregations (groupBy * 6)
    // 3. currentMonthExpensesByCategory (groupBy)
    // 4. topExpenseRows (groupBy)
    // 5. topIncomeRows (groupBy)

    // We can verify calls by inspecting arguments or returning different values based on arguments.
    (prisma.transaction.groupBy as jest.Mock).mockImplementation(async (args) => {
      // 1. All time stats
      if (!args.where.date) {
        return [
           { type: 'income', _sum: { amount: new Prisma.Decimal(10000) } },
           { type: 'expense', _sum: { amount: new Prisma.Decimal(5000) } }
        ];
      }

      // 2. Monthly stats (args.where.date is set)
      if (args.where.date && !args.by.includes('category')) {
         return [
             { type: 'income', _sum: { amount: new Prisma.Decimal(1000) } },
             { type: 'expense', _sum: { amount: new Prisma.Decimal(500) } }
         ];
      }

      // 3. Expenses by Category (for Budget calculation) - THIS IS WHERE THE BUG WAS
      if (args.by.includes('category') && args.where.type === 'expense' && !args.take) {
          return [
              { category: 'Food', _sum: { amount: new Prisma.Decimal(300) } }, // Should be picked up
              { category: 'Unknown', _sum: { amount: new Prisma.Decimal(50) } }
          ];
      }

      // 4. Top categories
      return [];
    });

    // Mock findMany for entertainment
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue([]);

    const result = await service.getDashboardStatistics(userId);

    // Assertions
    expect(result.financialSummary).toBeDefined();

    // Check Budget Categories
    // We mocked 'Food' with 300 spent.
    const foodCat = result.budgetCategories.find(c => c.name === 'DASHBOARD.CATEGORIES.FOOD');
    expect(foodCat).toBeDefined();
    expect(foodCat?.spent).toBe(300); // If bug persists (item.amount), this would be 0 or throw.

    // Check financial summary
    // Since we mocked 1000 income and 500 expense for ALL 6 months.
    // The current month is the last bucket.
    expect(result.financialSummary.income).toBe(1000);
    expect(result.financialSummary.expenses).toBe(500);
  });
});
