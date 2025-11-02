export type TransactionType = 'income' | 'expense';

export interface TransactionInput {
  amount: number;
  category: string;
  date: Date;
  type: TransactionType;
}

export interface Transaction extends TransactionInput {
  id: string;
}
