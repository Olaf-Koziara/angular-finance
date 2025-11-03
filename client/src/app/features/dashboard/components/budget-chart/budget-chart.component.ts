import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BudgetCategory } from '../../models/dashboard.models';
import { formatCurrency } from '../../utils/format.utils';

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.scss'
})
export class BudgetChartComponent {
  categories = input.required<BudgetCategory[]>();
  
  formatCurrency = formatCurrency;
}

