import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionFilters } from '../../models/transaction.model';
import {
  TRANSACTION_CATEGORIES,
  TransactionCategory,
} from '../../constants/transaction-categories.constant';

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
  ],
  templateUrl: './transaction-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFiltersComponent {
  private readonly fb = inject(FormBuilder);
  categories = TRANSACTION_CATEGORIES;
  readonly filters = input.required<TransactionFilters>();
  readonly changed = output<TransactionFilters>();
  readonly types: ReadonlyArray<TransactionFilters['type']> = ['all', 'income', 'expense'];
  readonly form = this.fb.nonNullable.group({
    search: '',
    type: 'all' as TransactionFilters['type'],
    categories: [[...this.categories] as TransactionCategory[]],
  });

  constructor() {
    effect(() => {
      const value = this.filters();
      this.form.patchValue(value, { emitEvent: false });
    });
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.changed.emit(this.form.getRawValue());
    });
  }

  clearSearch(): void {
    this.form.controls.search.setValue('');
  }
}
