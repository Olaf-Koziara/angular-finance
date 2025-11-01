import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { formatCurrency } from '../../utils/format.utils';

interface SummaryCard {
  type: 'balance' | 'income' | 'expenses' | 'budget';
  label: string;
  value: number | string;
  trend?: number;
  budgetUsage?: number;
  icon: string;
}

@Component({
  selector: 'app-financial-summary-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatProgressBarModule, TranslateModule],
  templateUrl: './financial-summary-card.component.html',
  styleUrl: './financial-summary-card.component.scss'
})
export class FinancialSummaryCardComponent {
  card = input.required<SummaryCard>();
  hovered = signal(false);
  
  formatCurrency = formatCurrency;

  getFormattedValue(): string {
    const card = this.card();
    if (card.type === 'budget') {
      return `${card.value}%`;
    }
    return formatCurrency(card.value as number);
  }

  onHover(hover: boolean): void {
    this.hovered.set(hover);
  }
}

