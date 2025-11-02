import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, CurrencyPipe],
})
export class TransactionListComponent {
  readonly transactions = input.required<readonly Transaction[]>();
  readonly removed = output<string>();

  readonly displayedColumns = ['date', 'category', 'type', 'amount', 'actions'] as const;

  readonly hasTransactions = computed(() => this.transactions().length > 0);

  remove(id: string): void {
    this.removed.emit(id);
  }
}
