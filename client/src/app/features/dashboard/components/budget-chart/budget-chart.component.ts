import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BudgetCategory } from '../../models/dashboard.model';
import { AppCurrencyPipe } from "../../../../shared/pipes/app-currency.pipe";

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TranslateModule, AppCurrencyPipe],
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.scss',
})
export class BudgetChartComponent {
  categories = input.required<BudgetCategory[]>();
}
