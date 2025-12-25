import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BudgetService } from '../services/budget.service';
import { Budget, CategoryBudget } from '../models/budget.model';
import { TRANSACTION_CATEGORIES } from '../../transactions/constants/transaction-categories.constant';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class BudgetPageComponent {
  private readonly budgetService = inject(BudgetService);

  // Signals for state management
  readonly budget = signal<Budget | null>(null);
  readonly generalBudget = signal<number>(0);
  readonly categoryBudgets = signal<CategoryBudget[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  // Computed values
  readonly categories = computed(() => TRANSACTION_CATEGORIES);
  readonly totalCategoryBudgets = computed(() =>
    this.categoryBudgets().reduce((sum, cb) => sum + cb.amount, 0)
  );

  constructor() {
    // Load budget data on initialization
    this.loadBudget();
  }

  private loadBudget(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.budgetService.getBudget().subscribe({
      next: (budget) => {
        this.budget.set(budget);
        this.generalBudget.set(budget.generalBudget);
        this.categoryBudgets.set([...budget.categoryBudgets]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load budget:', err);
        this.error.set('Failed to load budget data');
        this.isLoading.set(false);
      },
    });
  }

  saveGeneralBudget(value: string): void {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      return;
    }

    this.budgetService.updateGeneralBudget(amount).subscribe({
      next: (updatedBudget) => {
        this.budget.set(updatedBudget);
        this.generalBudget.set(amount);
      },
      error: (err) => {
        console.error('Failed to update general budget:', err);
        this.error.set('Failed to update general budget');
      },
    });
  }

  saveCategoryBudget(category: string, value: string): void {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) {
      return;
    }

    this.budgetService.updateCategoryBudget(category, amount).subscribe({
      next: (updatedBudget) => {
        this.budget.set(updatedBudget);
        this.categoryBudgets.set([...updatedBudget.categoryBudgets]);
      },
      error: (err) => {
        console.error('Failed to update category budget:', err);
        this.error.set('Failed to update category budget');
      },
    });
  }

  getCategoryBudget(category: string): number {
    return this.categoryBudgets().find((cb) => cb.category === category)?.amount ?? 0;
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }
}

