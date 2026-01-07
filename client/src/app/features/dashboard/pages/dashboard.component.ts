import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { AlertsListComponent } from '../components/alerts-list/alerts-list.component';
import { BudgetChartComponent } from '../components/budget-chart/budget-chart.component';
import { FinancialSummaryCardComponent } from '../components/financial-summary-card/financial-summary-card.component';
import { MonthlyTrendChartComponent } from '../components/monthly-trend-chart/monthly-trend-chart.component';
import { TrendsSectionComponent } from '../components/trends-section/trends-section.component';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TranslateModule,
    FinancialSummaryCardComponent,
    TrendsSectionComponent,
    BudgetChartComponent,
    MonthlyTrendChartComponent,
    AlertsListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  readonly financialSummary = this.dashboardService.financialSummary;
  readonly trends = this.dashboardService.trends;
  readonly budgetCategories = this.dashboardService.budgetCategories;
  readonly monthlyData = this.dashboardService.monthlyData;
  readonly alerts = this.dashboardService.alerts;
  readonly topCategories = this.dashboardService.topCategories;

 
  readonly loading = this.dashboardService.loading;
  readonly error = this.dashboardService.error;
  ngOnInit(): void {
    this.dashboardService.refresh();
  }
  summaryCards = computed(() => {
    const summary = this.financialSummary();
    const monthly = this.monthlyData();
    const top = this.topCategories();
    const current = monthly.at(-1);
    const prev = monthly.at(-2);

    const currentNet = current ? current.income - current.expenses : 0;
    const prevNet = prev ? prev.income - prev.expenses : 0;
    const balanceTrend = percentChange(currentNet, prevNet);
    const incomeTrend = percentChange(current?.income ?? 0, prev?.income ?? 0);
    const expenseTrend = percentChange(current?.expenses ?? 0, prev?.expenses ?? 0);

    const cards = [
      {
        type: 'balance' as const,
        label: 'DASHBOARD.BALANCE',
        value: summary.balance,
        trend: round1(balanceTrend),
        icon: 'account_balance_wallet',
      },
      {
        type: 'income' as const,
        label: 'DASHBOARD.INCOME',
        value: summary.income,
        trend: round1(incomeTrend),
        icon: 'arrow_upward',
      },
      {
        type: 'expenses' as const,
        label: 'DASHBOARD.EXPENSES',
        value: summary.expenses,
        trend: round1(expenseTrend),
        icon: 'arrow_downward',
      },
      {
        type: 'budget' as const,
        label: 'DASHBOARD.BUDGET',
        value: summary.budgetUsage,
        budgetUsage: summary.budgetUsage,
        icon: 'pie_chart',
      },
    ] as const;

    const extras: Array<{
      type: 'topIncome' | 'topExpense';
      label: string;
      detail?: string;
      value: number;
      icon: string;
    }> = [];

    if (top.income) {
      extras.push({
        type: 'topIncome',
        label: 'DASHBOARD.STATISTICS.HIGHEST_INCOME',
        detail: categoryToTranslationKey(top.income.category),
        value: top.income.amount,
        icon: 'trending_up',
      });
    }

    if (top.expense) {
      extras.push({
        type: 'topExpense',
        label: 'DASHBOARD.STATISTICS.HIGHEST_EXPENSE',
        detail: categoryToTranslationKey(top.expense.category),
        value: top.expense.amount,
        icon: 'trending_down',
      });
    }

    return [...cards, ...extras];
  });
}

function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function categoryToTranslationKey(category: string): string {

  const normalized = category.trim();
  if (!normalized) return category;

  const key = normalized.toUpperCase().replace(/\s+/g, '_');
  return `TRANSACTIONS.CATEGORIES.${key}`;
}
