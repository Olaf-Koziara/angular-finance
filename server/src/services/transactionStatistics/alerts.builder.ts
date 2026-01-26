import { Alert, BudgetCategory } from "./types";

// Alert threshold constants
const LOW_BALANCE_THRESHOLD = 1000;
const UNUSUAL_SPENDING_THRESHOLD = 1.5;

/**
 * Builds alerts based on budget categories, balance, and spending patterns.
 */
export function buildAlerts(
  budgetCategories: BudgetCategory[],
  balance: number,
  entertainmentSpent: number,
  entertainmentAvg: number,
  unallocatedBudget?: number,
  _totalCategoryBudgets?: number,
  generalBudget?: number,
  totalSpent?: number
): Alert[] {
  const alerts: Alert[] = [];

  // Check if category budgets sum exceeds general budget (warning)
  if (
    unallocatedBudget !== undefined &&
    unallocatedBudget < 0 &&
    generalBudget !== undefined &&
    generalBudget > 0
  ) {
    alerts.push({
      type: "warning",
      message: "DASHBOARD.ALERTS_LIST.CATEGORY_BUDGETS_EXCEED_GENERAL",
      icon: "warning",
    });
  }

  // Check if general budget is exceeded (error)
  if (
    generalBudget !== undefined &&
    generalBudget > 0 &&
    totalSpent !== undefined &&
    totalSpent > generalBudget
  ) {
    alerts.push({
      type: "error",
      message: "DASHBOARD.ALERTS_LIST.GENERAL_BUDGET_EXCEEDED",
      icon: "error",
    });
  }

  // Check if any budget category is exceeded
  const foodCategory = budgetCategories.find(
    (c) => c.name === "DASHBOARD.CATEGORIES.FOOD"
  );
  if ((foodCategory?.percentage ?? 0) > 100) {
    alerts.push({
      type: "error",
      message: "DASHBOARD.ALERTS_LIST.BUDGET_EXCEEDED",
      icon: "error",
    });
  }

  // Low balance warning
  if (balance < LOW_BALANCE_THRESHOLD) {
    alerts.push({
      type: "warning",
      message: "DASHBOARD.ALERTS_LIST.LOW_BALANCE",
      icon: "warning",
    });
  }

  // Unusual spending pattern
  if (entertainmentAvg > 0 && entertainmentSpent > entertainmentAvg * UNUSUAL_SPENDING_THRESHOLD) {
    alerts.push({
      type: "info",
      message: "DASHBOARD.ALERTS_LIST.UNUSUAL_SPENDING",
      icon: "info",
    });
  }

  return alerts;
}
