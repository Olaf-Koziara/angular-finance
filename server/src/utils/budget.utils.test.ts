import { calculateCategoryBudgetsSum, validateCategoryBudgetsAgainstGeneral } from './budget.utils';

describe('Budget Utils', () => {
  describe('calculateCategoryBudgetsSum', () => {
    it('should return 0 for empty object', () => {
      expect(calculateCategoryBudgetsSum({})).toBe(0);
    });

    it('should calculate sum of category budgets', () => {
      const categoryBudgets = {
        Food: 500,
        Transport: 300,
        Housing: 1500,
      };
      expect(calculateCategoryBudgetsSum(categoryBudgets)).toBe(2300);
    });

    it('should handle decimal values', () => {
      const categoryBudgets = {
        Food: 500.50,
        Transport: 300.25,
        Housing: 1500.75,
      };
      expect(calculateCategoryBudgetsSum(categoryBudgets)).toBe(2301.5);
    });
  });

  describe('validateCategoryBudgetsAgainstGeneral', () => {
    it('should not throw when category budgets sum equals general budget', () => {
      const categoryBudgets = {
        Food: 500,
        Transport: 300,
        Housing: 1200,
      };
      const generalBudget = 2000;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).not.toThrow();
    });

    it('should not throw when category budgets sum is less than general budget', () => {
      const categoryBudgets = {
        Food: 500,
        Transport: 300,
        Housing: 1000,
      };
      const generalBudget = 2000;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).not.toThrow();
    });

    it('should throw BadRequestError when category budgets sum exceeds general budget', () => {
      const categoryBudgets = {
        Food: 500,
        Transport: 300,
        Housing: 1500,
      };
      const generalBudget = 2000;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).toThrow(
        'Sum of category budgets (2300.00) cannot exceed general budget (2000.00)'
      );
    });

    it('should throw when category budgets sum is slightly over general budget', () => {
      const categoryBudgets = {
        Food: 500.01,
        Transport: 300,
        Housing: 1200,
      };
      const generalBudget = 2000;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).toThrow(
        'cannot exceed general budget'
      );
    });

    it('should not throw when categoryBudgets is an empty object', () => {
      const categoryBudgets = {};
      const generalBudget = 2000;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).not.toThrow();
    });

    it('should handle zero general budget', () => {
      const categoryBudgets = {
        Food: 100,
      };
      const generalBudget = 0;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).toThrow(
        'cannot exceed general budget'
      );
    });

    it('should handle zero category budgets with zero general budget', () => {
      const categoryBudgets = {};
      const generalBudget = 0;

      expect(() => validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget)).not.toThrow();
    });
  });
});
