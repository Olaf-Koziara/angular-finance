export type BudgetConfig = {
  key: string;
  categoryMatchers: string[];
  budget: number | null;
  color: string;
  translationKey: string;
};

export const DASHBOARD_BUDGETS: BudgetConfig[] = [
  {
    key: "Food",
    categoryMatchers: ["Food"],
    budget: null,
    color: "#f44336",
    translationKey: "DASHBOARD.CATEGORIES.FOOD",
  },
  {
    key: "Transport",
    categoryMatchers: ["Transport", "Transportation"],
    budget: null,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.TRANSPORT",
  },
  {
    key: "Entertainment",
    categoryMatchers: ["Entertainment"],
    budget: null,
    color: "#ff9800",
    translationKey: "DASHBOARD.CATEGORIES.ENTERTAINMENT",
  },
  {
    key: "Utilities",
    categoryMatchers: ["Utilities"],
    budget: null,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.UTILITIES",
  },
  {
    key: "Healthcare",
    categoryMatchers: ["Health", "Healthcare"],
    budget: null,
    color: "#4caf50",
    translationKey: "DASHBOARD.CATEGORIES.HEALTHCARE",
  },
  {
    key: "Other",
    categoryMatchers: ["Other", "Housing", "Education"],
    budget: null,
    color: "#2196f3",
    translationKey: "DASHBOARD.CATEGORIES.OTHER",
  },
];
