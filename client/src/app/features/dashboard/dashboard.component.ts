import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FinancialSummaryCardComponent } from './components/financial-summary-card/financial-summary-card.component';
import { TrendsSectionComponent } from './components/trends-section/trends-section.component';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';
import { MonthlyTrendChartComponent } from './components/monthly-trend-chart/monthly-trend-chart.component';
import { AlertsListComponent } from './components/alerts-list/alerts-list.component';
import {
  FinancialSummary,
  TrendData,
  BudgetCategory,
  MonthlyData,
  Alert,
} from './models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FinancialSummaryCardComponent,
    TrendsSectionComponent,
    BudgetChartComponent,
    MonthlyTrendChartComponent,
    AlertsListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  financialSummary = signal<FinancialSummary>({
    balance: 25430.50,
    income: 8500.00,
    expenses: 5240.30,
    budgetUsage: 68,
    alerts: 3,
  });

  trends = signal<TrendData[]>([
    { label: 'DASHBOARD.BALANCE_CHANGE', value: 3260.20, change: 12.5 },
    { label: 'DASHBOARD.STATISTICS.MONTHLY_AVERAGE', value: 6850.00, change: -3.2 },
    { label: 'DASHBOARD.STATISTICS.SAVINGS_RATE', value: 38.4, change: 5.8 },
  ]);

  budgetCategories = signal<BudgetCategory[]>([
    { name: 'DASHBOARD.CATEGORIES.FOOD', spent: 1200, budget: 1000, percentage: 120, color: '#f44336' },
    { name: 'DASHBOARD.CATEGORIES.TRANSPORT', spent: 450, budget: 600, percentage: 75, color: '#4caf50' },
    { name: 'DASHBOARD.CATEGORIES.ENTERTAINMENT', spent: 820, budget: 800, percentage: 102.5, color: '#ff9800' },
    { name: 'DASHBOARD.CATEGORIES.UTILITIES', spent: 380, budget: 500, percentage: 76, color: '#4caf50' },
    { name: 'DASHBOARD.CATEGORIES.HEALTHCARE', spent: 290, budget: 400, percentage: 72.5, color: '#4caf50' },
    { name: 'DASHBOARD.CATEGORIES.OTHER', spent: 180, budget: 300, percentage: 60, color: '#2196f3' },
  ]);

  monthlyData = signal<MonthlyData[]>([
    { month: 'DASHBOARD.MONTHS.JAN', income: 8200, expenses: 5100 },
    { month: 'DASHBOARD.MONTHS.FEB', income: 8300, expenses: 5300 },
    { month: 'DASHBOARD.MONTHS.MAR', income: 8100, expenses: 4900 },
    { month: 'DASHBOARD.MONTHS.APR', income: 8600, expenses: 5400 },
    { month: 'DASHBOARD.MONTHS.MAY', income: 8400, expenses: 5200 },
    { month: 'DASHBOARD.MONTHS.JUN', income: 8500, expenses: 5240 },
  ]);

  alerts = signal<Alert[]>([
    { type: 'error', message: 'DASHBOARD.ALERTS_LIST.BUDGET_EXCEEDED', icon: 'error' },
    { type: 'warning', message: 'DASHBOARD.ALERTS_LIST.LOW_BALANCE', icon: 'warning' },
    { type: 'info', message: 'DASHBOARD.ALERTS_LIST.UNUSUAL_SPENDING', icon: 'info' },
  ]);

  summaryCards = computed(() => {
    const summary = this.financialSummary();
    return [
      {
        type: 'balance' as const,
        label: 'DASHBOARD.BALANCE',
        value: summary.balance,
        trend: 12.5,
        icon: 'account_balance_wallet',
      },
      {
        type: 'income' as const,
        label: 'DASHBOARD.INCOME',
        value: summary.income,
        trend: 8.2,
        icon: 'arrow_upward',
      },
      {
        type: 'expenses' as const,
        label: 'DASHBOARD.EXPENSES',
        value: summary.expenses,
        trend: -3.2,
        icon: 'arrow_downward',
      },
      {
        type: 'budget' as const,
        label: 'DASHBOARD.BUDGET',
        value: summary.budgetUsage,
        budgetUsage: summary.budgetUsage,
        icon: 'pie_chart',
      },
    ];
  });
}
