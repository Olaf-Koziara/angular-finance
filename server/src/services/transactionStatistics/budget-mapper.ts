import { Budget } from "../../types/budget";
import { BudgetConfig, DASHBOARD_BUDGETS } from "../../constants/dashboard-budgets.config";
import { TRANSACTION_CATEGORIES } from "../../constants/categories.constant";

/**
 * Maps real budgets from BudgetService to dashboard budget configs.
 * Matches category budgets using categoryMatchers, falls back to general budget if not found.
 */
export function mapBudgetsToConfig(
  budget: Budget | null,
  configs: BudgetConfig[] = DASHBOARD_BUDGETS
): BudgetConfig[] {
  if (!budget) {
    return configs.map((cfg) => ({ ...cfg, budget: null }));
  }

  const { generalBudget, categoryBudgets } = budget;
  const configCount = configs.length;
  const fallbackBudget = configCount > 0 ? generalBudget / configCount : 0;

  return configs.map((cfg) => {
    // Try to find matching category budget
    let matchedBudget: number | null = null;

    for (const matcher of cfg.categoryMatchers) {
      // Find matching TransactionCategory (case-insensitive)
      const matchingCategory = TRANSACTION_CATEGORIES.find(
        (cat) => cat.toLowerCase() === matcher.toLowerCase()
      );

      if (matchingCategory && categoryBudgets[matchingCategory] !== undefined) {
        matchedBudget = categoryBudgets[matchingCategory];
        break;
      }
    }

    // If no category budget found, use fallback (general budget divided by config count)
    if (matchedBudget === null) {
      matchedBudget = generalBudget > 0 ? fallbackBudget : null;
    }

    return {
      ...cfg,
      budget: matchedBudget,
    };
  });
}
