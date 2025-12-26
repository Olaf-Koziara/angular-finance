import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";

type TrendData = {
  label: string;
  value: number;
  change: number;
};

type FinancialSummary = {
  balance: number;
  income: number;
  expenses: number;
  budgetUsage: number;
  alerts: number;
};

type BudgetCategory = {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
  color: string;
};

type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
};

type Alert = {
  type: "warning" | "error" | "info";
  message: string;
  icon: string;
};

type TopCategory = {
  category: string;
  amount: number;
};

export type TransactionStatisticsResponse = {
  financialSummary: FinancialSummary;
  trends: TrendData[];
  budgetCategories: BudgetCategory[];
  monthlyData: MonthlyData[];
  alerts: Alert[];
  topCategories: {
    expense: TopCategory | null;
    income: TopCategory | null;
  };
};

type BudgetConfig = {
  key: string;
  categoryMatchers: string[];
  budget: number;
  color: string;
  translationKey: string;
};

const DASHBOARD_BUDGETS: BudgetConfig[] = [
  {
    key: "Food",
    categoryMatchers: ["Food"],
    budget: 1000,
    color: "#f44336",
    translationKey: "DASHBOARD.CATEGORIES.FOOD",
  },
  {
    key: "Transport",
    categoryMatchers: ["Transport", "Transportation"],
    budget: 600,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.TRANSPORT",
  },
  {
    key: "Entertainment",
    categoryMatchers: ["Entertainment"],
    budget: 800,
    color: "#ff9800",
    translationKey: "DASHBOARD.CATEGORIES.ENTERTAINMENT",
  },
  {
    key: "Utilities",
    categoryMatchers: ["Utilities"],
    budget: 500,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.UTILITIES",
  },
  {
    key: "Healthcare",
    categoryMatchers: ["Health", "Healthcare"],
    budget: 400,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.HEALTHCARE",
  },
  {
    key: "Other",
    categoryMatchers: ["Other", "Housing", "Education"],
    budget: 300,
    color: "#2196f3",
    translationKey: "DASHBOARD.CATEGORIES.OTHER",
  },
];

const MONTH_KEYS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1, 0, 0, 0, 0);
}

function decimalToNumber(value: Prisma.Decimal | null | undefined): number {
  if (!value) return 0;
  return Number(value.toString());
}

function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

type MonthBucket = {
  monthStart: Date;
  income: number;
  expenses: number;
};

function buildMonthBuckets(months: number, now: Date): MonthBucket[] {
  const start = startOfMonth(addMonths(now, -(months - 1)));
  const buckets: MonthBucket[] = [];
  for (let i = 0; i < months; i++) {
    buckets.push({
      monthStart: addMonths(start, i),
      income: 0,
      expenses: 0,
    });
  }
  return buckets;
}

function monthKey(date: Date): string {
  return `DASHBOARD.MONTHS.${MONTH_KEYS[date.getMonth()]}`;
}

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
    const prevMonth = monthsBuckets.length >= 2 ? monthsBuckets[monthsBuckets.length - 2]! : null;

    const currentNet = currentMonth.income - currentMonth.expenses;
    const prevNet = prevMonth ? prevMonth.income - prevMonth.expenses : 0;

    // Budget categories for current month expenses (by known categories)
    const nextMonthStart = addMonths(currentMonthStart, 1);
    const currentMonthExpensesByCategory = await prisma.transaction.findMany({
      where: {
        userId,
        type: "expense",
        date: { gte: currentMonthStart, lt: nextMonthStart },
      },
      select: { category: true, amount: true },
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

    const spentByKey = new Map<string, number>();
    for (const item of currentMonthExpensesByCategory) {
      const amt = decimalToNumber(item.amount);
      const cfg = DASHBOARD_BUDGETS.find((c) =>
        c.categoryMatchers.some((m) => m.toLowerCase() === item.category.toLowerCase())
      );
      const key = cfg?.key ?? "Other";
      spentByKey.set(key, (spentByKey.get(key) ?? 0) + amt);
    }

    const budgetCategories: BudgetCategory[] = DASHBOARD_BUDGETS.map((cfg) => {
      const spent = spentByKey.get(cfg.key) ?? 0;
      const percentage = cfg.budget > 0 ? (spent / cfg.budget) * 100 : 0;
      return {
        name: cfg.translationKey,
        spent: round2(spent),
        budget: round2(cfg.budget),
        percentage: round2(percentage),
        color: cfg.color,
      };
    });

    const totalBudget = DASHBOARD_BUDGETS.reduce((acc, c) => acc + c.budget, 0);
    const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
    const budgetUsage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const allTimeIncome = decimalToNumber(incomeAgg._sum.amount);
    const allTimeExpenses = decimalToNumber(expenseAgg._sum.amount);
    const balance = allTimeIncome - allTimeExpenses;

    // Alerts
    const alerts: Alert[] = [];
    const foodCategory = budgetCategories.find((c) => c.name === "DASHBOARD.CATEGORIES.FOOD");
    if ((foodCategory?.percentage ?? 0) > 100) {
      alerts.push({
        type: "error",
        message: "DASHBOARD.ALERTS_LIST.BUDGET_EXCEEDED",
        icon: "error",
      });
    }
    if (balance < 1000) {
      alerts.push({
        type: "warning",
        message: "DASHBOARD.ALERTS_LIST.LOW_BALANCE",
        icon: "warning",
      });
    }
    const entertainmentSpent = spentByKey.get("Entertainment") ?? 0;
    const entertainmentAvg = averageEntertainmentExpense(recentTransactions);
    if (entertainmentAvg > 0 && entertainmentSpent > entertainmentAvg * 1.5) {
      alerts.push({
        type: "info",
        message: "DASHBOARD.ALERTS_LIST.UNUSUAL_SPENDING",
        icon: "info",
      });
    }

    const savingsRate =
      currentMonth.income > 0 ? ((currentMonth.income - currentMonth.expenses) / currentMonth.income) * 100 : 0;
    const prevSavingsRate =
      prevMonth && prevMonth.income > 0
        ? ((prevMonth.income - prevMonth.expenses) / prevMonth.income) * 100
        : 0;

    const avgMonthlyExpenses =
      monthsBuckets.length > 0
        ? monthsBuckets.reduce((acc, b) => acc + b.expenses, 0) / monthsBuckets.length
        : 0;

    const trends: TrendData[] = [
      {
        label: "DASHBOARD.BALANCE_CHANGE",
        value: round2(currentNet),
        change: round2(percentChange(currentNet, prevNet)),
      },
      {
        label: "DASHBOARD.STATISTICS.MONTHLY_AVERAGE",
        value: round2(avgMonthlyExpenses),
        change: round2(
          percentChange(currentMonth.expenses, prevMonth ? prevMonth.expenses : 0)
        ),
      },
      {
        label: "DASHBOARD.STATISTICS.SAVINGS_RATE",
        value: round2(savingsRate),
        change: round2(percentChange(savingsRate, prevSavingsRate)),
      },
    ];

    const financialSummary: FinancialSummary = {
      balance: round2(balance),
      income: round2(currentMonth.income),
      expenses: round2(currentMonth.expenses),
      budgetUsage: round2(budgetUsage),
      alerts: alerts.length,
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

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function averageEntertainmentExpense(
  recentTransactions: Array<{ amount: Prisma.Decimal; type: string; category: string; date: Date }>
): number {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const threeMonthsStart = startOfMonth(addMonths(now, -3));

  // Compute average monthly entertainment expense for the last 3 full months (excluding current month)
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


