
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
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
    MatButtonModule,
    MatCardModule,
    MatIconModule,
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
  private readonly dialog = inject(MatDialog);

  readonly transactions = this.transactionService.transactions;
  readonly total = this.transactionService.total;
  readonly loading = this.transactionService.loading;
  readonly filters = this.transactionService.filters;
  readonly pagination = this.transactionService.pagination;
  readonly sort = this.transactionService.sort;
  readonly pageSizeOptions = [5, 10, 25, 50];
  readonly editingTransaction = signal<Transaction | null>(null);
  readonly saving = signal(false);
  readonly selectionMode = signal(false);
  readonly selectedIds = signal(new Set<string>());

  async createTransaction(payload: CreateTransaction): Promise<void> {
    this.saving.set(true);
    try {
      await this.transactionService.create(payload);
    } finally {
      this.saving.set(false);
    }
  }

  removeTransaction(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'COMMON.CONFIRMATION.DELETE_TITLE',
        message: 'COMMON.CONFIRMATION.DELETE_MESSAGE',
        confirmText: 'COMMON.CONFIRMATION.CONFIRM',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService.remove(id);
      }
    });
  }

  toggleSelectionMode(): void {
    this.selectionMode.update((v) => !v);
    if (!this.selectionMode()) {
      this.selectedIds.set(new Set());
    }
  }

  onToggleSelection(id: string): void {
    this.selectedIds.update((ids) => {
      const newIds = new Set(ids);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  }

  onToggleAll(checked: boolean): void {
    if (checked) {
      const allIds = this.transactions().map((t) => t.id);
      this.selectedIds.set(new Set(allIds));
    } else {
      this.selectedIds.set(new Set());
    }
  }

  removeSelected(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'COMMON.CONFIRMATION.DELETE_TITLE',
        message: 'COMMON.CONFIRMATION.DELETE_MESSAGE',
        confirmText: 'COMMON.CONFIRMATION.CONFIRM',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.transactionService.removeMany(Array.from(this.selectedIds()));
        this.selectedIds.set(new Set());
        this.selectionMode.set(false);
      }
    });
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
    this.saving.set(true);
    try {
      await this.transactionService.update(payload.id, payload.changes);
      this.editingTransaction.set(null);
    } catch {
    } finally {
      this.saving.set(false);
    }
  }
}
