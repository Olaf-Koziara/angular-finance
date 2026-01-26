import { Component, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AppCurrencyPipe } from '../../../../shared/pipes/app-currency.pipe';

interface SummaryCard {
  type: 'balance' | 'income' | 'expenses' | 'budget' | 'topIncome' | 'topExpense';
  label: string;
  detail?: string;
  value: number | string;
  trend?: number;
  budgetUsage?: number;
  icon: string;
}

@Component({
  selector: 'app-financial-summary-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatProgressBarModule, TranslateModule, AppCurrencyPipe],
  templateUrl: './financial-summary-card.component.html',
  styleUrl: './financial-summary-card.component.scss'
})
export class FinancialSummaryCardComponent {
  card = input.required<SummaryCard>();
  hovered = signal(false);


  onHover(hover: boolean): void {
    this.hovered.set(hover);
  }
}

