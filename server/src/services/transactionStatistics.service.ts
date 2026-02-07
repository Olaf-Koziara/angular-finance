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
    const nextMonthStart = addMonths(currentMonthStart, 1);
    const threeMonthsStart = startOfMonth(addMonths(now, -3));

    // Fetch budget and populate config with real values
    const budgetService = new BudgetService();
    const budget = await budgetService.getBudget(userId);
    const populatedConfigs = mapBudgetsToConfig(budget, DASHBOARD_BUDGETS);

    // Optimization: Combined aggregation query and optimized fetches
    // Replaced fetching all recent transactions with targeted aggregations to reduce data transfer and memory usage.
    const [
      allTimeStats,
      monthlyStatsRaw,
      currentMonthExpensesByCategory,
      topExpenseRows,
      topIncomeRows,
      entertainmentStatsRaw,
    ] = await Promise.all([
      // 1. All-time stats
      prisma.transaction.groupBy({
        by: ["type"],
        where: { userId },
        _sum: { amount: true },
      }),
      // 2. Monthly income/expenses (Optimized with raw query)
      prisma.$queryRaw<Array<{ month: Date; type: string; total: unknown }>>`
        SELECT
          DATE_TRUNC('month', "date") as "month",
          "type",
          SUM("amount") as "total"
        FROM "transactions"
        WHERE "userId" = ${userId}
          AND "date" >= ${rangeStart}
          AND "date" < ${rangeEnd}
        GROUP BY 1, 2
      `,
      // 3. Current month expenses by category
      prisma.transaction.groupBy({
        by: ["category"],
        where: {
          userId,
          type: "expense",
          date: { gte: currentMonthStart, lt: nextMonthStart },
        },
        _sum: { amount: true },
      }),
      // 4. Top expenses (previous full month)
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
      // 5. Top income (previous full month)
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
      // 6. Entertainment expenses (Optimized with raw query for average calculation)
      prisma.$queryRaw<Array<{ total: unknown }>>`
        SELECT
          SUM("amount") as "total"
        FROM "transactions"
        WHERE "userId" = ${userId}
          AND "type" = 'expense'
          AND LOWER("category") = 'entertainment'
          AND "date" >= ${threeMonthsStart}
          AND "date" < ${currentMonthStart}
        GROUP BY DATE_TRUNC('month', "date")
      `,
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

    // Build monthly buckets from aggregated data
    for (const row of monthlyStatsRaw) {
      const txDate = new Date(row.month); // Ensure it's a date object
      const monthStart = startOfMonth(txDate);
      const idx =
        (monthStart.getFullYear() - rangeStart.getFullYear()) * 12 +
        (monthStart.getMonth() - rangeStart.getMonth());

      if (idx >= 0 && idx < monthsBuckets.length) {
        // Handle potentially different types returned by raw query (number or string or Decimal)
        const amount = Number(row.total);
        if (!isNaN(amount)) {
            if (row.type === "income") monthsBuckets[idx]!.income += amount;
            if (row.type === "expense") monthsBuckets[idx]!.expenses += amount;
        }
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
      // Fix: item.amount does not exist, use item._sum.amount
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

    // Calculate entertainment average from aggregated stats
    let entertainmentAvg = 0;
    if (entertainmentStatsRaw.length > 0) {
        const total = entertainmentStatsRaw.reduce((acc, row) => acc + Number(row.total), 0);
        entertainmentAvg = total / entertainmentStatsRaw.length;
    }

    // Build alerts
    const entertainmentSpent = spentByKey.get("Entertainment") ?? 0;
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

export const transactionStatisticsService = new TransactionStatisticsService();
