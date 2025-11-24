import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Transaction } from '../../models/transaction.model';

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

  readonly removed = output<string>();

  readonly displayedColumns = ['date', 'category', 'type', 'amount', 'actions'] as const;

  readonly hasTransactions = computed(() => this.total() > 0);

  remove(id: string): void {
    this.removed.emit(id);
  }
}

