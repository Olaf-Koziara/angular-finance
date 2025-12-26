import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget.model';
import { TRANSACTION_CATEGORIES } from '../../transactions/constants/transaction-categories.constant';
import { form, Field } from '@angular/forms/signals';
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
    Field,
  ],
})
export class BudgetPageComponent {
  private readonly budgetService = inject(BudgetService);

  readonly budget = signal<Budget>({
    generalBudget: 0,
    categoryBudgets: TRANSACTION_CATEGORIES.reduce(
      (acc, cat) => ({ ...acc, [cat]: 0 }),
      {} as Record<(typeof TRANSACTION_CATEGORIES)[number], number>
    ),
  });
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  form = form(this.budget);

  // Computed values
  readonly categories = computed(() => TRANSACTION_CATEGORIES);
  readonly totalCategoryBudgets = computed(() =>
    Object.values(this.budget().categoryBudgets).reduce((sum, cb) => sum + cb, 0)
  );

  constructor() {
    this.loadBudget();
  }

  private loadBudget(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.budgetService.getBudget().subscribe({
      next: (budget) => {
        console.log(budget);
        this.budget.set(budget);
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status != '404') {
          console.error('Failed to load budget:', err);
          this.error.set('Failed to load budget data');
        }
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
      },
      error: (err) => {
        console.error('Failed to update category budget:', err);
        this.error.set('Failed to update category budget');
      },
    });
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }
}
