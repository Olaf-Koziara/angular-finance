import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { Transaction, TransactionFilters } from '../../models/transaction.model';
import { TransactionFiltersComponent } from '../transaction-filters/transaction-filters.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule,
    TransactionFiltersComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, CurrencyPipe],
})
export class TransactionListComponent {
  readonly transactions = input.required<readonly Transaction[]>();
  readonly removed = output<string>();
  filters = signal<TransactionFilters>({
    search: '',
    type: 'all',
    categories: [],
  });

  readonly displayedColumns = ['date', 'category', 'type', 'amount', 'actions'] as const;

  readonly hasTransactions = computed(() => this.transactions().length > 0);

  remove(id: string): void {
    this.removed.emit(id);
  }
}
