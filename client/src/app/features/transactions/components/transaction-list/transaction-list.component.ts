import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import {
  SortColumn,
  SortOrder,
  Transaction,
  TransactionSort,
} from '../../models/transaction.model';
import { AppCurrencyPipe } from '../../../../shared/pipes/app-currency.pipe';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule,
    TranslateModule,
    LoaderComponent,
    AppCurrencyPipe,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, CurrencyPipe],
})
export class TransactionListComponent {
  readonly transactions = input.required<readonly Transaction[]>();
  readonly total = input.required<number>();
  readonly loading = input.required<boolean>();
  readonly sort = input.required<TransactionSort>();
  readonly selectionMode = input<boolean>(false);
  readonly selectedIds = input<Set<string>>(new Set());

  readonly removed = output<string>();
  readonly edited = output<Transaction>();
  readonly sortChanged = output<TransactionSort>();
  readonly toggleSelection = output<string>();
  readonly toggleAll = output<boolean>();

  readonly displayedColumns = computed(() => {
    const baseCols = ['date', 'title', 'category', 'type', 'amount', 'actions'];
    return this.selectionMode() ? ['select', ...baseCols] : baseCols;
  });

  readonly hasTransactions = computed(() => this.total() > 0);
  readonly allSelected = computed(() => {
    return (
      this.transactions().length > 0 &&
      this.transactions().every((t) => this.selectedIds().has(t.id))
    );
  });
  readonly someSelected = computed(() => {
    return this.transactions().length > 0 && this.selectedIds().size > 0 && !this.allSelected();
  });

  remove(id: string): void {
    this.removed.emit(id);
  }

  edit(transaction: Transaction): void {
    this.edited.emit(transaction);
  }

  onSortChange(sort: Sort): void {
    this.sortChanged.emit({
      column: sort.active as SortColumn,
      order: (sort.direction as SortOrder) || 'desc',
    });
  }
}
