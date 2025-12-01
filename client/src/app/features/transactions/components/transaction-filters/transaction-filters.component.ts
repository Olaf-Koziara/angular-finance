import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TransactionFilters } from '../../models/transaction.model';
import { TRANSACTION_CATEGORIES } from '../../constants/transaction-categories.constant';
import { TransactionCategory } from '../../constants/transaction-categories.constant';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './transaction-filters.component.html',
  styleUrl: './transaction-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFiltersComponent {
  private readonly fb = inject(FormBuilder);
  categories = TRANSACTION_CATEGORIES;
  readonly filters = input.required<TransactionFilters>();
  readonly changed = output<Partial<TransactionFilters>>();
  readonly types: ReadonlyArray<TransactionFilters['type']> = ['all', 'income', 'expense'];
  private readonly defaultFilters: TransactionFilters = {
    search: '',
    type: 'all',
    categories: null,
  };
  readonly hasActiveFilters = computed(() => {
    const current = this.filters();
    const hasSearch = current.search.trim().length > 0;
    const hasType = current.type !== 'all';
    const hasCategories = (current.categories?.length ?? 0) > 0;
    return hasSearch || hasType || hasCategories;
  });
  readonly formGroup = this.fb.group({
    search: this.fb.control('', { nonNullable: true }),
    type: this.fb.control<TransactionFilters['type']>('all', { nonNullable: true }),
    categories: this.fb.control<TransactionCategory[] | null>(null),
  });
  readonly trackByType = (_: number, option: TransactionFilters['type']) => option;
  readonly trackByCategory = (_: number, category: TransactionCategory) => category;

  constructor() {
    effect(() => {
      const value = this.filters();
      this.formGroup.patchValue(value, { emitEvent: false });
    });
    this.formGroup.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(300)
    ).subscribe(() => {
      this.changed.emit(this.formGroup.getRawValue());
    });
  }

  clearSearch(): void {
    this.formGroup.controls.search.setValue('');
  }

  clearFilters(): void {
    const resetValue: TransactionFilters = { ...this.defaultFilters };
    this.formGroup.setValue(resetValue, { emitEvent: false });
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.changed.emit(resetValue);
  }
}
