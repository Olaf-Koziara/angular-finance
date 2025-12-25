import { TransactionCategory } from '../../transactions/constants/transaction-categories.constant';

export interface CategoryBudget {
  category: TransactionCategory;
  amount: number;
}

export interface Budget {
  id?: string;
  userId?: string;
  generalBudget: number;
  categoryBudgets: CategoryBudget[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BudgetResponse {
  success: boolean;
  data: Budget;
  message?: string;
}

