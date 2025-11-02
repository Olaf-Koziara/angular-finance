import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../../core/transactions/transaction.service';
import { TransactionFormComponent } from './transaction-form.component';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionInput } from '../../core/transactions/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatCardModule, TransactionFormComponent, TransactionListComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  private readonly transactionService = inject(TransactionService);

  readonly transactions = this.transactionService.transactions;

  handleSave(input: TransactionInput): void {
    this.transactionService.create(input);
  }
}
