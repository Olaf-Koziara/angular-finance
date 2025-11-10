import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CreateTransaction, TransactionType } from '../../models/transaction.model';
import { TransactionCategory } from '../../constants/transaction-categories.constant';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly categories = input<string[]>([
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Savings',
    'Other',
  ]);

  readonly submitted = output<CreateTransaction>();

  readonly form = this.fb.group({
    amount: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    category: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: this.fb.control<Date | null>(new Date(), {
      validators: [Validators.required],
    }),
    type: this.fb.control<TransactionType>('expense', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { amount, category, date, type } = this.form.getRawValue();
    const parsed = typeof date === 'string' ? new Date(date) : date;
    const safeDate = parsed ?? new Date();
    this.submitted.emit({
      amount: amount ?? 0,
      category: category as TransactionCategory,
      date: safeDate.toISOString(),
      type,
    });
    this.form.reset({
      amount: null,
      category: '',
      date: safeDate,
      type,
    });
    Object.values(this.form.controls).forEach((control) => {
      control.setErrors(null);
    });
  }
}
