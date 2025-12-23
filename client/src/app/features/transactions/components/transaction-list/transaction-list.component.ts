import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import {
  SortColumn,
  SortOrder,
  Transaction,
  TransactionSort,
} from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule,
    LoaderComponent,
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

  readonly removed = output<string>();
  readonly edited = output<Transaction>();
  readonly sortChanged = output<TransactionSort>();

  readonly displayedColumns = ['date', 'title', 'category', 'type', 'amount', 'actions'] as const;

  readonly hasTransactions = computed(() => this.total() > 0);

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
