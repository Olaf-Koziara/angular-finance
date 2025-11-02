export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export interface CreateTransaction {
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}
