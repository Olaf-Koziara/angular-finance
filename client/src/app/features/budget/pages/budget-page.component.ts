import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget.model';
import { TRANSACTION_CATEGORIES } from '../../transactions/constants/transaction-categories.constant';
import { form, Field, min, required, validate } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
import { numericValidator } from '../../../shared/utils/validators';
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
    MatAnchor,
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
  readonly form = form(this.budget, (budget) => {
    min(budget.generalBudget, 0);
    validate(budget.generalBudget, ({ value }) =>
      numericValidator(value()) ? null : { kind: 'numeric', message: 'Value should be number' }
    );

    TRANSACTION_CATEGORIES.forEach((category) => {
      const fieldPath = budget.categoryBudgets[category];
      min(fieldPath, 0);
      required(fieldPath);
      validate(fieldPath, ({ value }) =>
        numericValidator(value()) ? null : { kind: 'numeric', message: 'Value should be number' }
      );
    });
  });

  readonly categories = computed(() => TRANSACTION_CATEGORIES);
  readonly totalCategoryBudgets = computed(() =>
    Object.values(this.budget().categoryBudgets).reduce((sum, cb) => (cb > 0 ? sum + cb : sum), 0)
  );

  constructor() {
    this.loadBudget();
  }

  private loadBudget(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.budgetService.getBudget().subscribe({
      next: (budget) => {
        this.budget.set(budget);
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Failed to load budget:', err);
          this.error.set('Failed to load budget data');
        }
        this.isLoading.set(false);
      },
    });
  }

  saveGeneralBudget(value: number): void {
    if (isNaN(value) || value < 0) {
      return;
    }

    this.budgetService.updateGeneralBudget(value).subscribe({
      next: (updatedBudget) => {},
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
  saveBudget(): void {
    this.budgetService.updateBudget(this.budget()).subscribe({
      next: (savedBudget) => this.budget.set(savedBudget),
      complete: () => {
        this.form().reset();
      },
    });
  }
  trackByCategory(index: number, category: string): string {
    return category;
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.keyCode === 189 || event.keyCode === 109) {
      event.preventDefault();
    }
  }
}
