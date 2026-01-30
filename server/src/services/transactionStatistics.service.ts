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

    // Optimization: Combined aggregation query and optimized fetches
    const [allTimeStats, aggregatedTransactions] = await Promise.all([
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      }),
      prisma.$queryRaw<Array<{
        monthStart: Date;
        type: string;
        category: string;
        amount: number | Prisma.Decimal;
      }>>`
        SELECT
          DATE_TRUNC('month', "date") as "monthStart",
          "type",
          "category",
          SUM("amount") as "amount"
        FROM "transactions"
        WHERE "userId" = ${userId}
          AND "date" >= ${rangeStart}
          AND "date" < ${rangeEnd}
        GROUP BY 1, 2, 3
      `
    ]);

    const incomeAgg = { _sum: { amount: new Prisma.Decimal(0) } };
    const expenseAgg = { _sum: { amount: new Prisma.Decimal(0) } };

    for (const stat of allTimeStats) {
      if (stat.type === "income" && stat._sum.amount) {
        incomeAgg._sum.amount = stat._sum.amount;
      }
      if (stat.type === "expense" && stat._sum.amount) {
        expenseAgg._sum.amount = stat._sum.amount;
      }
    }

    // Build monthly buckets
    for (const row of aggregatedTransactions) {
      const monthStart = new Date(row.monthStart);
      const idx =
        (monthStart.getFullYear() - rangeStart.getFullYear()) * 12 +
        (monthStart.getMonth() - rangeStart.getMonth());
      if (idx < 0 || idx >= monthsBuckets.length) continue;

      const amount = Number(row.amount);
      if (row.type === "income") monthsBuckets[idx]!.income += amount;
      if (row.type === "expense") monthsBuckets[idx]!.expenses += amount;
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

    // Pre-calculate category -> configKey map for O(1) lookup
    const categoryToConfigKey = new Map<string, string>();
    for (const cfg of populatedConfigs) {
      for (const matcher of cfg.categoryMatchers) {
        const lowerMatcher = matcher.toLowerCase();
        if (!categoryToConfigKey.has(lowerMatcher)) {
          categoryToConfigKey.set(lowerMatcher, cfg.key);
        }
      }
    }

    // Process aggregated transactions for current month expenses and top categories
    const spentByKey = new Map<string, number>();
    const topExpenses: Array<{ category: string; amount: number }> = [];
    const topIncomes: Array<{ category: string; amount: number }> = [];

    for (const row of aggregatedTransactions) {
        const monthStart = new Date(row.monthStart);
        const amount = Number(row.amount);

        // Current Month Expenses by Category (for Budget)
        if (monthStart.getTime() === currentMonthStart.getTime() && row.type === 'expense') {
            const key = categoryToConfigKey.get(row.category.toLowerCase()) ?? "Other";
            spentByKey.set(key, (spentByKey.get(key) ?? 0) + amount);
        }

        // Last Month Top Categories
        if (monthStart.getTime() === lastMonthStart.getTime()) {
            if (row.type === 'expense') {
                // If multiple rows for same category (should not happen if grouped by category/month), aggregate them
                // But our query groups by category/month, so unique here.
                topExpenses.push({ category: row.category, amount });
            } else if (row.type === 'income') {
                topIncomes.push({ category: row.category, amount });
            }
        }
    }

    // Sort Top Categories
    topExpenses.sort((a, b) => b.amount - a.amount);
    topIncomes.sort((a, b) => b.amount - a.amount);

    const topExpenseCategory: TopCategory | null =
      topExpenses.length > 0
        ? {
            category: topExpenses[0]!.category,
            amount: round2(topExpenses[0]!.amount),
          }
        : null;

    const topIncomeCategory: TopCategory | null =
      topIncomes.length > 0
        ? {
            category: topIncomes[0]!.category,
            amount: round2(topIncomes[0]!.amount),
          }
        : null;

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
    const entertainmentAvg = calculateAverageEntertainment(aggregatedTransactions, currentMonthStart);
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
function calculateAverageEntertainment(
  aggregatedTransactions: Array<{
    monthStart: Date;
    type: string;
    category: string;
    amount: number | Prisma.Decimal;
  }>,
  currentMonthStart: Date
): number {
  const threeMonthsStart = startOfMonth(addMonths(currentMonthStart, -3));
  const byMonth = new Map<string, number>();

  for (const row of aggregatedTransactions) {
    const monthStart = new Date(row.monthStart);

    // Filter conditions
    if (row.type !== "expense") continue;
    if (row.category.toLowerCase() !== "entertainment") continue;
    if (monthStart.getTime() >= currentMonthStart.getTime()) continue;
    if (monthStart.getTime() < threeMonthsStart.getTime()) continue;

    const key = monthStart.toISOString();
    byMonth.set(key, (byMonth.get(key) ?? 0) + Number(row.amount));
  }

  if (byMonth.size === 0) return 0;
  const total = Array.from(byMonth.values()).reduce((acc, v) => acc + v, 0);
  return total / byMonth.size;
}

export const transactionStatisticsService = new TransactionStatisticsService();
