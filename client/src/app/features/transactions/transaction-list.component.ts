import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Transaction, TransactionType } from '../../core/transactions/transaction.model';

type SortColumn = 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  readonly transactions = input.required<Transaction[]>();

  readonly typeFilter = signal<TransactionType | 'all'>('all');
  readonly categoryQuery = signal('');
  readonly sortColumn = signal<SortColumn>('date');
  readonly sortDirection = signal<SortDirection>('desc');
  readonly columns: readonly string[] = ['date', 'category', 'type', 'amount'];

  readonly data = computed(() => {
    const items = this.transactions();
    const type = this.typeFilter();
    const query = this.categoryQuery().trim().toLowerCase();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    const filtered = items.filter((item) => {
      const matchesType = type === 'all' || item.type === type;
      const matchesCategory = query === '' || item.category.toLowerCase().includes(query);
      return matchesType && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      const factor = direction === 'asc' ? 1 : -1;
      if (column === 'date') {
        return (a.date.getTime() - b.date.getTime()) * factor;
      }
      return (a.amount - b.amount) * factor;
    });
  });

  setTypeFilter(type: TransactionType | 'all'): void {
    this.typeFilter.set(type);
  }

  setCategoryFilter(value: string): void {
    this.categoryQuery.set(value);
  }

  setSort(column: SortColumn): void {
    this.sortColumn.set(column);
  }

  toggleDirection(): void {
    this.sortDirection.update((direction) => (direction === 'asc' ? 'desc' : 'asc'));
  }
}
