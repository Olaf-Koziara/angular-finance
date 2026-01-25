import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import { BudgetService } from "./budget.service";
import {
  TransactionStatisticsResponse,
  FinancialSummary,
  BudgetCategory,
  MonthlyData,
  TopCategory,
} from "./transactionStatistics/types";
import { DASHBOARD_BUDGETS } from "../constants/dashboard-budgets.config";
import { mapBudgetsToConfig } from "./transactionStatistics/budget-mapper";
import { buildAlerts } from "./transactionStatistics/alerts.builder";
import { buildTrends } from "./transactionStatistics/trends.builder";
import {
  startOfMonth,
  addMonths,
  buildMonthBuckets,
  monthKey,
} from "../utils/date.utils";
import { decimalToNumber, round2 } from "../utils/number.utils";

export class TransactionStatisticsService {
  async getDashboardStatistics(
    userId: string,
    months = 6
  ): Promise<TransactionStatisticsResponse> {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(addMonths(now, -1));
    const monthsBuckets = buildMonthBuckets(months, now);
    const rangeStart = monthsBuckets[0]?.monthStart ?? startOfMonth(now);
    const rangeEnd = addMonths(startOfMonth(now), 1);

    // Fetch budget and populate config with real values
    const budgetService = new BudgetService();
    const budget = await budgetService.getBudget(userId);
    const populatedConfigs = mapBudgetsToConfig(budget, DASHBOARD_BUDGETS);

    const [incomeAgg, expenseAgg, recentTransactions] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId, type: "income" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { userId, type: "expense" },
        _sum: { amount: true },
      }),
      prisma.transaction.findMany({
        where: {
          userId,
          date: {
            gte: rangeStart,
            lt: rangeEnd,
          },
        },
        select: {
          amount: true,
          type: true,
          category: true,
          date: true,
        },
        orderBy: { date: "asc" },
      }),
    ]);

    // Build monthly buckets
    for (const tx of recentTransactions) {
      const txDate = tx.date;
      const monthStart = startOfMonth(txDate);
      const idx =
        (monthStart.getFullYear() - rangeStart.getFullYear()) * 12 +
        (monthStart.getMonth() - rangeStart.getMonth());
      if (idx < 0 || idx >= monthsBuckets.length) continue;

      const amount = decimalToNumber(tx.amount);
      if (tx.type === "income") monthsBuckets[idx]!.income += amount;
      if (tx.type === "expense") monthsBuckets[idx]!.expenses += amount;
    }

    const monthlyData: MonthlyData[] = monthsBuckets.map((b) => ({
      month: monthKey(b.monthStart),
      income: round2(b.income),
      expenses: round2(b.expenses),
    }));

    const currentMonth = monthsBuckets[monthsBuckets.length - 1]!;
    const prevMonth =
      monthsBuckets.length >= 2
        ? monthsBuckets[monthsBuckets.length - 2]!
        : null;

    // Budget categories for current month expenses (by known categories)
    const nextMonthStart = addMonths(currentMonthStart, 1);
    // OPTIMIZATION: Use groupBy to aggregate expenses by category in the database
    // instead of fetching individual transactions. This reduces data transfer
    // and processing time, especially for users with many transactions.
    const currentMonthExpensesByCategory = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        type: "expense",
        date: { gte: currentMonthStart, lt: nextMonthStart },
      },
      _sum: { amount: true },
    });

    // Top categories (previous full month)
    const [topExpenseRows, topIncomeRows] = await Promise.all([
      prisma.transaction.groupBy({
        by: ["category"],
        where: {
          userId,
          type: "expense",
          date: { gte: lastMonthStart, lt: currentMonthStart },
        },
        _sum: { amount: true },
        orderBy: { _sum: { amount: "desc" } },
        take: 1,
      }),
      prisma.transaction.groupBy({
        by: ["category"],
        where: {
          userId,
          type: "income",
          date: { gte: lastMonthStart, lt: currentMonthStart },
        },
        _sum: { amount: true },
        orderBy: { _sum: { amount: "desc" } },
        take: 1,
      }),
    ]);

    const topExpenseCategory: TopCategory | null =
      topExpenseRows.length > 0
        ? {
            category: topExpenseRows[0]!.category,
            amount: round2(decimalToNumber(topExpenseRows[0]!._sum.amount)),
          }
        : null;

    const topIncomeCategory: TopCategory | null =
      topIncomeRows.length > 0
        ? {
            category: topIncomeRows[0]!.category,
            amount: round2(decimalToNumber(topIncomeRows[0]!._sum.amount)),
          }
        : null;

    // Map expenses to budget categories
    const spentByKey = new Map<string, number>();
    for (const item of currentMonthExpensesByCategory) {
      const amt = decimalToNumber(item._sum.amount ?? new Prisma.Decimal(0));
      const cfg = populatedConfigs.find((c) =>
        c.categoryMatchers.some(
          (m) => m.toLowerCase() === item.category.toLowerCase()
        )
      );
      const key = cfg?.key ?? "Other";
      spentByKey.set(key, (spentByKey.get(key) ?? 0) + amt);
    }

    // Build budget categories with real budgets
    const budgetCategories: BudgetCategory[] = populatedConfigs.map((cfg) => {
      const spent = spentByKey.get(cfg.key) ?? 0;
      const budgetAmount = cfg.budget ?? 0;
      const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
      return {
        name: cfg.translationKey,
        spent: round2(spent),
        budget: round2(budgetAmount),
        percentage: round2(percentage),
        color: cfg.color,
      };
    });

    // Use generalBudget for overall budget usage calculation
    const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
    const generalBudget = budget?.generalBudget ?? 0;
    const budgetUsage =
      generalBudget > 0 ? (totalSpent / generalBudget) * 100 : 0;

    // Calculate enhanced budget metrics
    const totalCategoryBudgets = budgetCategories.reduce(
      (acc, c) => acc + c.budget,
      0
    );
    const unallocatedBudget =
      generalBudget > 0 ? generalBudget - totalCategoryBudgets : undefined;
    const categoryBudgetUsage =
      totalCategoryBudgets > 0
        ? (totalSpent / totalCategoryBudgets) * 100
        : undefined;

    const allTimeIncome = decimalToNumber(incomeAgg._sum.amount);
    const allTimeExpenses = decimalToNumber(expenseAgg._sum.amount);
    const balance = allTimeIncome - allTimeExpenses;

    // Build alerts
    const entertainmentSpent = spentByKey.get("Entertainment") ?? 0;
    const entertainmentAvg = averageEntertainmentExpense(recentTransactions);
    const alerts = buildAlerts(
      budgetCategories,
      balance,
      entertainmentSpent,
      entertainmentAvg,
      unallocatedBudget,
      totalCategoryBudgets,
      generalBudget,
      totalSpent
    );

    // Build trends
    const trends = buildTrends(currentMonth, prevMonth, monthsBuckets);

    const financialSummary: FinancialSummary = {
      balance: round2(balance),
      income: round2(currentMonth.income),
      expenses: round2(currentMonth.expenses),
      budgetUsage: round2(budgetUsage),
      alerts: alerts.length,
      categoryBudgetUsage:
        categoryBudgetUsage !== undefined
          ? round2(categoryBudgetUsage)
          : undefined,
      unallocatedBudget:
        unallocatedBudget !== undefined ? round2(unallocatedBudget) : undefined,
      totalCategoryBudgets:
        totalCategoryBudgets > 0 ? round2(totalCategoryBudgets) : undefined,
    };

    return {
      financialSummary,
      trends,
      budgetCategories,
      monthlyData,
      alerts,
      topCategories: {
        expense: topExpenseCategory,
        income: topIncomeCategory,
      },
    };
  }
}

/**
 * Computes average monthly entertainment expense for the last 3 full months
 * (excluding current month).
 */
function averageEntertainmentExpense(
  recentTransactions: Array<{
    amount: Prisma.Decimal;
    type: string;
    category: string;
    date: Date;
  }>
): number {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const threeMonthsStart = startOfMonth(addMonths(now, -3));

  const byMonth = new Map<string, number>();
  for (const tx of recentTransactions) {
    if (tx.type !== "expense") continue;
    if (tx.category.toLowerCase() !== "entertainment") continue;
    if (tx.date >= currentMonthStart) continue;
    if (tx.date < threeMonthsStart) continue;

    const m = startOfMonth(tx.date);
    const key = `${m.getFullYear()}-${m.getMonth()}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + decimalToNumber(tx.amount));
  }

  if (byMonth.size === 0) return 0;
  const total = Array.from(byMonth.values()).reduce((acc, v) => acc + v, 0);
  return total / byMonth.size;
}

export const transactionStatisticsService = new TransactionStatisticsService();
