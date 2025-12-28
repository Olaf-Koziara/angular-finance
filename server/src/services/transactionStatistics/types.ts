export type TrendData = {
  label: string;
  value: number;
  change: number;
};

export type FinancialSummary = {
  balance: number;
  income: number;
  expenses: number;
  budgetUsage: number;
  alerts: number;
  categoryBudgetUsage?: number;
  unallocatedBudget?: number;
  totalCategoryBudgets?: number;
};

export type BudgetCategory = {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
  color: string;
};

export type MonthlyData = {
  month: string;
  income: number;
  expenses: number;
};

export type Alert = {
  type: "warning" | "error" | "info";
  message: string;
  icon: string;
};

export type TopCategory = {
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

export type MonthBucket = {
  monthStart: Date;
  income: number;
  expenses: number;
};
