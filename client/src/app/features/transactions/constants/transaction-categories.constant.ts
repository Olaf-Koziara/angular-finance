export const TRANSACTION_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Other',
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];
