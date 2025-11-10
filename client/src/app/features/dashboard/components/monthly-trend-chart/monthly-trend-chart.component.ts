import { Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MonthlyData } from '../../models/dashboard.model';
import { formatCurrency } from '../../utils/format.utils';

@Component({
  selector: 'app-monthly-trend-chart',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatTooltipModule, TranslateModule],
  templateUrl: './monthly-trend-chart.component.html',
  styleUrl: './monthly-trend-chart.component.scss',
})
export class MonthlyTrendChartComponent {
  monthlyData = input.required<MonthlyData[]>();
  selectedMonth = signal<number>(5);

  formatCurrency = formatCurrency;

  onMonthSelect(index: number): void {
    this.selectedMonth.set(index);
  }
}
