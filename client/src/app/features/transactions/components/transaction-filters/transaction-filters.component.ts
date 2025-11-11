import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    TranslateModule,
  ],
  templateUrl: './transaction-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFiltersComponent {
  private readonly fb = inject(FormBuilder);
  categories = TRANSACTION_CATEGORIES;
  readonly filters = input.required<TransactionFilters>();
  readonly changed = output<Partial<TransactionFilters>>();
  readonly types: ReadonlyArray<TransactionFilters['type']> = ['all', 'income', 'expense'];
  readonly formGroup = this.fb.group({
    search: this.fb.control('', { nonNullable: true }),
    type: this.fb.control<TransactionFilters['type']>('all', { nonNullable: true }),
    categories: this.fb.control<TransactionCategory[] | null>(null),
  });

  constructor() {
    effect(() => {
      const value = this.filters();
      this.formGroup.patchValue(value, { emitEvent: false });
    });
    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.changed.emit(this.formGroup.getRawValue());
    });
  }

  clearSearch(): void {
    this.formGroup.controls.search.setValue('');
  }
}
