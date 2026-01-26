import { TransactionCategory } from "../constants/categories.constant";

export interface Budget {
  id?: string;
  userId?: string;
  generalBudget: number;
  categoryBudgets: Record<TransactionCategory, number>;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CategoryBudgetsRecord = Record<TransactionCategory, number>;
