import { TransactionCategory } from '../constants/transaction-categories.constant';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  type: TransactionType;
}

export interface CreateTransaction {
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  type: TransactionType;
}

export interface TransactionFilters {
  search: string;
  type: 'all' | TransactionType;
  categories: TransactionCategory[] | null;
}

export type SortOrder = 'asc' | 'desc';
export type SortColumn = 'date' | 'title' | 'category' | 'amount';

export interface TransactionSort {
  column: SortColumn;
  order: SortOrder;
}
