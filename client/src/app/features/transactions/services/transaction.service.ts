import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom, Subscription } from 'rxjs';
import {
  CreateTransaction,
  Transaction,
  TransactionFilters,
  TransactionSort,
} from '../models/transaction.model';

export interface TransactionPagination {
  pageIndex: number;
  pageSize: number;
}

export interface TransactionState {
  filters: TransactionFilters;
  pagination: TransactionPagination;
  sort: TransactionSort;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly apiUrl = '/transactions';

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

  readonly sort = signal<TransactionSort>({
    column: 'date',
    order: 'desc',
  });

  private readonly state = computed<TransactionState>(() => ({
    filters: this.filters(),
    pagination: this.pagination(),
    sort: this.sort(),
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
            this.error.set(this.translate.instant('TRANSACTIONS.ERRORS.FETCH_FAILED'));
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

  updateSort(sort: TransactionSort): void {
    this.sort.set(sort);
  }

  async create(payload: CreateTransaction): Promise<void> {
    this.error.set(null);
    const tempTransactions = [...this.transactions()];
    try {
      this.transactions.set([...tempTransactions, { id: '', ...payload }]);
      const transaction = await firstValueFrom(this.http.post<Transaction>(this.apiUrl, payload));
      const updatedTransactions = this.transactions().map((transactionMapItem) =>
        transactionMapItem.id === '' ? transaction : transactionMapItem
      );
      this.transactions.set(updatedTransactions);
    } catch {
      this.transactions.set(tempTransactions);
      this.error.set(this.translate.instant('TRANSACTIONS.ERRORS.CREATE_FAILED'));
    }
  }

  async update(id: string, payload: CreateTransaction): Promise<void> {
    this.error.set(null);
    const previousTransactions = [...this.transactions()];
    try {
      const transaction = await firstValueFrom(
        this.http.put<Transaction>(`${this.apiUrl}/${id}`, payload)
      );
      this.transactions.update((items) =>
        items.map((item) => (item.id === id ? transaction : item))
      );
      this.refresh();
    } catch (error) {
      this.transactions.set(previousTransactions);
      this.error.set(this.translate.instant('TRANSACTIONS.ERRORS.UPDATE_FAILED'));
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.refresh();
    } catch {
      this.error.set(this.translate.instant('TRANSACTIONS.ERRORS.DELETE_FAILED'));
    } finally {
      this.loading.set(false);
    }
  }

  private refresh(): void {
    this.pagination.update((current) => ({ ...current }));
  }

  private buildHttpParams({ filters, pagination, sort }: TransactionState): HttpParams {
    let httpParams = new HttpParams()
      .set('page', (pagination.pageIndex + 1).toString())
      .set('limit', pagination.pageSize.toString())
      .set('sortBy', sort.column)
      .set('sortOrder', sort.order);

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
