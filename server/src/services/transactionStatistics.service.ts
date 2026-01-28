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
    const threeMonthsStart = startOfMonth(addMonths(now, -3));

    // Fetch budget and populate config with real values
    const budgetService = new BudgetService();
    const budget = await budgetService.getBudget(userId);
    const populatedConfigs = mapBudgetsToConfig(budget, DASHBOARD_BUDGETS);

    // Optimization: Combined aggregation query and optimized fetches
    const [allTimeStats, monthlyAggregations, entertainmentTransactions] = await Promise.all([
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      }),
      // Optimization: Execute parallel queries for each month to avoid fetching all transactions
      Promise.all(
        monthsBuckets.map(async (bucket) => {
          const start = bucket.monthStart;
          const end = addMonths(start, 1);
          return prisma.transaction.groupBy({
            by: ["type"],
            where: {
              userId,
              date: { gte: start, lt: end },
            },
            _sum: { amount: true },
          });
        })
      ),
      // Targeted fetch for entertainment average
      prisma.transaction.findMany({
        where: {
          userId,
          category: { equals: "Entertainment", mode: "insensitive" },
          date: { gte: threeMonthsStart, lt: currentMonthStart },
          type: "expense",
        },
        select: {
          amount: true,
          date: true,
        },
      }),
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

    // Populate monthly buckets from aggregation results
    for (let i = 0; i < monthsBuckets.length; i++) {
      const bucket = monthsBuckets[i];
      const stats = monthlyAggregations[i];

      for (const stat of stats) {
        const amount = decimalToNumber(stat._sum.amount);
        if (stat.type === "income") bucket.income += amount;
        if (stat.type === "expense") bucket.expenses += amount;
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
    const entertainmentAvg = averageEntertainmentExpense(entertainmentTransactions);
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
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const threeMonthsStart = startOfMonth(addMonths(now, -3));

  const byMonth = new Map<string, number>();
  for (const tx of entertainmentTransactions) {
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
