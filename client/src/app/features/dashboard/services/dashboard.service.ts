import { HttpClient, HttpParams } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, Subscription } from 'rxjs';
import {
  Alert,
  BudgetCategory,
  FinancialSummary,
  MonthlyData,
  TopCategories,
  TrendData,
} from '../models/dashboard.model';

export interface DashboardStatisticsResponse {
  financialSummary: FinancialSummary;
  trends: TrendData[];
  budgetCategories: BudgetCategory[];
  monthlyData: MonthlyData[];
  alerts: Alert[];
  topCategories: TopCategories;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly apiUrl = '/transactions/statistics';

  readonly months = signal(6);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly financialSummary = signal<FinancialSummary>({
    balance: 0,
    income: 0,
    expenses: 0,
    budgetUsage: 0,
    alerts: 0,
  });
  readonly trends = signal<TrendData[]>([]);
  readonly budgetCategories = signal<BudgetCategory[]>([]);
  readonly monthlyData = signal<MonthlyData[]>([]);
  readonly alerts = signal<Alert[]>([]);
  readonly topCategories = signal<TopCategories>({ expense: null, income: null });

  private readonly fetchEffect = effect((onCleanup) => {
    this.months();
    this.fetchData();
  });
  private fetchData():void{
    this.loading.set(true);
    this.error.set(null);

    const params = new HttpParams().set('months', this.months().toString());
    const subscription: Subscription = this.http
      .get<DashboardStatisticsResponse>(this.apiUrl, { params })
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.financialSummary.set(response.financialSummary);
          this.trends.set(response.trends);
          this.budgetCategories.set(response.budgetCategories);
          this.monthlyData.set(response.monthlyData);
          this.alerts.set(response.alerts);
          this.topCategories.set(response.topCategories);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(this.translate.instant('DASHBOARD.ERRORS.FETCH_FAILED'));
          this.loading.set(false);
        },
      });
  }
  setMonths(months: number): void {
    const safe = Math.max(1, Math.min(24, Math.floor(months)));
    this.months.set(safe);
  }

  refresh(): void {
    this.fetchData();
  }
}
