
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionFiltersComponent } from '../components/transaction-filters/transaction-filters.component';
import { TransactionFormComponent } from '../components/transaction-form/transaction-form.component';
import { TransactionListComponent } from '../components/transaction-list/transaction-list.component';
import { TransactionPaginationComponent } from '../components/transaction-pagination/transaction-pagination.component';
import {
  CreateTransaction,
  Transaction,
  TransactionFilters,
  TransactionSort,
} from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    MatCardModule,
    TransactionFormComponent,
    TransactionListComponent,
    TranslateModule,
    TransactionPaginationComponent,
    TransactionFiltersComponent
],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPageComponent {
  private readonly transactionService = inject(TransactionService);

  readonly transactions = this.transactionService.transactions;
  readonly total = this.transactionService.total;
  readonly loading = this.transactionService.loading;
  readonly filters = this.transactionService.filters;
  readonly pagination = this.transactionService.pagination;
  readonly sort = this.transactionService.sort;
  readonly pageSizeOptions = [5, 10, 25, 50];
  readonly editingTransaction = signal<Transaction | null>(null);

  createTransaction(payload: CreateTransaction): void {
    this.transactionService.create(payload);
  }

  removeTransaction(id: string): void {
    this.transactionService.remove(id);
  }

  handleFilterChange(filters: Partial<TransactionFilters>): void {
    this.transactionService.updateFilters(filters);
  }

  handlePageChange(event: PageEvent): void {
    this.transactionService.updatePagination({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
  }

  handleSortChange(sort: TransactionSort): void {
    this.transactionService.updateSort(sort);
  }

  startEditing(transaction: Transaction): void {
    this.editingTransaction.set(transaction);
  }

  cancelEditing(): void {
    this.editingTransaction.set(null);
  }

  async updateTransaction(payload: { id: string; changes: CreateTransaction }): Promise<void> {
    try {
      await this.transactionService.update(payload.id, payload.changes);
      this.editingTransaction.set(null);
    } catch {}
  }
}
