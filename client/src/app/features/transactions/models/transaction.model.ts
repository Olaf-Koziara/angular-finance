import { TransactionCategory } from '../constants/transaction-categories.constant';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  type: TransactionType;
}

export interface CreateTransaction {
  amount: number;
  category: TransactionCategory;
  date: string;
  type: TransactionType;
}

export interface TransactionFilters {
  search: string;
  type: 'all' | TransactionType;
  categories: TransactionCategory[];
}
