import { transactionStatisticsService } from './transactionStatistics.service';
import { prisma } from '../config/database';
import { BudgetService } from './budget.service';
import { Prisma } from '@prisma/client';

jest.mock('../config/database', () => ({
  prisma: {
    transaction: {
      groupBy: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock('./budget.service');

describe('TransactionStatisticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return dashboard statistics correctly', async () => {
    // Mock BudgetService
    const mockGetBudget = jest.fn().mockResolvedValue({
      generalBudget: new Prisma.Decimal(5000),
      categoryBudgets: { Food: 500 },
    });

    (BudgetService as jest.Mock).mockImplementation(() => ({
      getBudget: mockGetBudget,
    }));

    // Mock Prisma responses
    // 1. allTimeStats
    // 2. currentMonthExpensesByCategory
    // 3. topExpenseRows
    // 4. topIncomeRows
    // Note: The order depends on execution order. In current synchronous code:
    // 1. allTimeStats
    // 2. currentMonthExpensesByCategory
    // 3. topExpenseRows
    // 4. topIncomeRows
    // But findMany is called after allTimeStats in Promise.all currently (wait, code says Promise.all([groupBy, findMany]))

    // In current code:
    // const [allTimeStats, recentTransactions] = await Promise.all([groupBy, findMany])
    // const currentMonthExpensesByCategory = await groupBy
    // const [topExpense, topIncome] = await Promise.all([groupBy, groupBy])

    (prisma.transaction.groupBy as jest.Mock)
      .mockResolvedValueOnce([ // allTimeStats
        { type: 'income', _sum: { amount: new Prisma.Decimal(10000) } },
        { type: 'expense', _sum: { amount: new Prisma.Decimal(5000) } },
      ])
      .mockResolvedValueOnce([ // currentMonthExpensesByCategory
        { category: 'Food', _sum: { amount: new Prisma.Decimal(200) } },
      ])
      .mockResolvedValueOnce([ // topExpenseRows
        { category: 'Rent', _sum: { amount: new Prisma.Decimal(1000) } },
      ])
      .mockResolvedValueOnce([ // topIncomeRows
        { category: 'Salary', _sum: { amount: new Prisma.Decimal(5000) } },
      ]);

    const now = new Date();
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue([ // recentTransactions
      {
        amount: new Prisma.Decimal(100),
        type: 'expense',
        category: 'Food',
        date: now,
      },
    ]);

    const userId = 'user-123';
    const result = await transactionStatisticsService.getDashboardStatistics(userId);

    expect(result).toBeDefined();
    expect(result.financialSummary.balance).toBe(5000); // 10000 - 5000
    expect(mockGetBudget).toHaveBeenCalledWith(userId);
    expect(prisma.transaction.groupBy).toHaveBeenCalledTimes(4);
    expect(prisma.transaction.findMany).toHaveBeenCalledTimes(1);

    // Verify top categories
    expect(result.topCategories.expense).toEqual({ category: 'Rent', amount: 1000 });
    expect(result.topCategories.income).toEqual({ category: 'Salary', amount: 5000 });
  });
});
