export interface FinancialSummary {
  balance: number;
  income: number;
  expenses: number;
  budgetUsage: number;
  alerts: number;
}

export interface TrendData {
  label: string;
  value: number;
  change: number;
}

export interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface Alert {
  type: 'warning' | 'error' | 'info';
  message: string;
  icon: string;
}

