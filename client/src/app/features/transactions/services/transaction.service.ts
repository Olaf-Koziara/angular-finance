import { Injectable, computed, signal } from '@angular/core';
import { CreateTransaction, Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly store = signal<Transaction[]>([]);
  readonly transactions = computed(() => this.store());

  create(payload: CreateTransaction): void {
    const transaction: Transaction = {
      id: this.getId(),
      ...payload,
    };
    this.store.update(items => [transaction, ...items]);
  }

  remove(id: string): void {
    this.store.update(items => items.filter(item => item.id !== id));
  }

  private getId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
