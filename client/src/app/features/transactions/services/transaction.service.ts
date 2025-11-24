import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { first, firstValueFrom, Subscription } from 'rxjs';
import { CreateTransaction, Transaction, TransactionFilters } from '../models/transaction.model';

export interface TransactionPagination {
  pageIndex: number;
  pageSize: number;
}

export interface TransactionState {
  filters: TransactionFilters;
  pagination: TransactionPagination;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/transactions';

  readonly loading = signal(false);
  readonly transactions = signal<Transaction[]>([]);
  readonly total = signal(0);
  readonly error = signal<string | null>(null);

  readonly filters = signal<TransactionFilters>({
    search: '',
    type: 'all',
    categories: [],
  });

  readonly pagination = signal<TransactionPagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  private readonly state = computed<TransactionState>(() => ({
    filters: this.filters(),
    pagination: this.pagination(),
  }));

  private readonly fetchEffect = effect((onCleanup) => {
    const currentState = this.state();
    const timer = setTimeout(() => {
      this.loading.set(true);
      this.error.set(null);
      const params = this.buildHttpParams(currentState);
      const subscription: Subscription = this.http
        .get<PaginatedResponse<Transaction>>(this.apiUrl, { params })
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.transactions.set(response.items);
            this.total.set(response.total);
            this.loading.set(false);
          },
          error: () => {
            this.error.set('Nie udało się pobrać transakcji');
            this.transactions.set([]);
            this.total.set(0);
            this.loading.set(false);
          },
        });
      onCleanup(() => subscription.unsubscribe());
    }, 100);

    onCleanup(() => clearTimeout(timer));
  });

  updateFilters(changes: Partial<TransactionFilters>): void {
    this.filters.update((current) => ({
      ...current,
      ...changes,
    }));
    this.pagination.update((current) => ({
      ...current,
      pageIndex: 0,
    }));
  }

  updatePagination(changes: Partial<TransactionPagination>): void {
    this.pagination.update((current) => ({
      ...current,
      ...changes,
    }));
  }

  async create(payload: CreateTransaction): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.http.post<Transaction>(this.apiUrl, payload));
      this.refresh();
    } catch {
      this.error.set('Nie udało się utworzyć transakcji');
    } finally {
      this.loading.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.refresh();
    } catch {
      this.error.set('Nie udało się usunąć transakcji');
    } finally {
      this.loading.set(false);
    }
  }

  private refresh(): void {
    this.pagination.update((current) => ({ ...current }));
  }

  private buildHttpParams({ filters, pagination }: TransactionState): HttpParams {
    let httpParams = new HttpParams()
      .set('page', pagination.pageIndex.toString())
      .set('limit', pagination.pageSize.toString());

    if (filters.search) {
      httpParams = httpParams.set('search', filters.search);
    }
    if (filters.type !== 'all') {
      httpParams = httpParams.set('type', filters.type);
    }
    filters.categories?.forEach((category) => {
      httpParams = httpParams.append('categories[]', category);
    });

    return httpParams;
  }
}
