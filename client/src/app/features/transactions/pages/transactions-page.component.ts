import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TransactionFormComponent } from '../components/transaction-form/transaction-form.component';
import { TransactionListComponent } from '../components/transaction-list/transaction-list.component';
import { CreateTransaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, TransactionFormComponent, TransactionListComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPageComponent {
  private readonly transactionService = inject(TransactionService);

  readonly transactions = computed(() => this.transactionService.transactions());

  createTransaction(payload: CreateTransaction): void {
    this.transactionService.create(payload);
  }

  removeTransaction(id: string): void {
    this.transactionService.remove(id);
  }
}
