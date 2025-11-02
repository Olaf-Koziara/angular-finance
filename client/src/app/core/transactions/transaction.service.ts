import { Injectable, computed, signal } from '@angular/core';
import { Transaction, TransactionInput } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly store = signal<Transaction[]>(this.seed());

  readonly transactions = computed(() => this.store());

  create(input: TransactionInput): void {
    this.store.update((transactions) => [{ ...input, id: crypto.randomUUID() }, ...transactions]);
  }

  private seed(): Transaction[] {
    return [
      {
        id: crypto.randomUUID(),
        amount: 2500,
        category: 'Salary',
        date: new Date(),
        type: 'income',
      },
      {
        id: crypto.randomUUID(),
        amount: 120,
        category: 'Groceries',
        date: new Date(),
        type: 'expense',
      },
      {
        id: crypto.randomUUID(),
        amount: 60,
        category: 'Transport',
        date: new Date(),
        type: 'expense',
      },
    ];
  }
}
