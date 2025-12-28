import { BadRequestError } from "./errors";

/**
 * Calculates the sum of all category budgets.
 */
export function calculateCategoryBudgetsSum(
  categoryBudgets: Record<string, number>
): number {
  return Object.values(categoryBudgets).reduce((sum, amount) => sum + amount, 0);
}

/**
 * Validates that the sum of category budgets does not exceed the general budget.
 * Throws BadRequestError if validation fails.
 */
export function validateCategoryBudgetsAgainstGeneral(
  categoryBudgets: Record<string, number>,
  generalBudget: number
): void {
  const sum = calculateCategoryBudgetsSum(categoryBudgets);
  
  if (sum > generalBudget) {
    throw new BadRequestError(
      `Sum of category budgets (${sum.toFixed(2)}) cannot exceed general budget (${generalBudget.toFixed(2)})`
    );
  }
}
