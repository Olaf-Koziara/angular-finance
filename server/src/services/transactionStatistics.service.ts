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
    const threeMonthsStart = startOfMonth(addMonths(now, -3));
    const monthsBuckets = buildMonthBuckets(months, now);

    // Fetch budget and populate config with real values
    const budgetService = new BudgetService();
    const budget = await budgetService.getBudget(userId);
    const populatedConfigs = mapBudgetsToConfig(budget, DASHBOARD_BUDGETS);

    // Optimization: Combined aggregation query and optimized fetches
    // Replaced fetching all transactions with specific aggregation queries
    const [allTimeStats, ...monthlyAndEntertainmentStats] = await Promise.all([
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      }),
      // Monthly buckets aggregation (concurrent)
      ...monthsBuckets.map((b) =>
        prisma.transaction.groupBy({
          by: ["type"],
          where: {
            userId,
            date: {
              gte: b.monthStart,
              lt: addMonths(b.monthStart, 1),
            },
          },
          _sum: { amount: true },
        })
      ),
      // Entertainment transactions (specific subset for alerts)
      prisma.transaction.findMany({
        where: {
          userId,
          type: "expense",
          category: { equals: "Entertainment", mode: "insensitive" },
          date: {
            gte: threeMonthsStart,
            lt: currentMonthStart,
          },
        },
        select: {
          amount: true,
          date: true,
        },
      }),
    ]);

    // Extract results
    // monthlyAndEntertainmentStats contains [month1Stats, month2Stats, ..., entertainmentTransactions]
    const monthlyStats = monthlyAndEntertainmentStats.slice(
      0,
      monthsBuckets.length
    ) as Array<
      Array<{ type: string; _sum: { amount: Prisma.Decimal | null } }>
    >;
    const entertainmentTransactions = monthlyAndEntertainmentStats[
      monthlyAndEntertainmentStats.length - 1
    ] as Array<{ amount: Prisma.Decimal; date: Date }>;

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

    // Build monthly buckets using aggregated data
    for (let i = 0; i < monthsBuckets.length; i++) {
      const stats = monthlyStats[i];
      for (const stat of stats) {
        const amount = decimalToNumber(stat._sum.amount);
        if (stat.type === "income") monthsBuckets[i]!.income += amount;
        if (stat.type === "expense") monthsBuckets[i]!.expenses += amount;
      }
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
    // Optimization: Use groupBy to reduce data transfer (group by category instead of fetching all rows)
    const nextMonthStart = addMonths(currentMonthStart, 1);
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

    const spentByKey = new Map<string, number>();
    for (const item of currentMonthExpensesByCategory) {
      // Fix: item is from groupBy, use item._sum.amount
      const amt = decimalToNumber(item._sum.amount);
      const key =
        categoryToConfigKey.get(item.category.toLowerCase()) ?? "Other";
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
    const entertainmentAvg = averageEntertainmentExpense(
      entertainmentTransactions
    );
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
  entertainmentTransactions: Array<{
    amount: Prisma.Decimal;
    date: Date;
  }>
): number {
  const byMonth = new Map<string, number>();
  for (const tx of entertainmentTransactions) {
    // Note: Filtering by type/category/date is already done in the query
    const m = startOfMonth(tx.date);
    const key = `${m.getFullYear()}-${m.getMonth()}`;
    byMonth.set(key, (byMonth.get(key) ?? 0) + decimalToNumber(tx.amount));
  }

  if (byMonth.size === 0) return 0;
  const total = Array.from(byMonth.values()).reduce((acc, v) => acc + v, 0);
  return total / byMonth.size;
}

export const transactionStatisticsService = new TransactionStatisticsService();
