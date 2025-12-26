import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { CreateTransaction, Transaction, TransactionType } from '../../models/transaction.model';
import {
  TransactionCategory,
  TRANSACTION_CATEGORIES,
} from '../../constants/transaction-categories.constant';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule
],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly categories = input<string[]>([...TRANSACTION_CATEGORIES]);
  readonly transaction = input<Transaction | null>(null);
  readonly submitted = output<CreateTransaction>();
  readonly updated = output<{ id: string; changes: CreateTransaction }>();
  readonly cancelled = output<void>();

  readonly form = this.fb.group({
    title: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    }),
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

  private readonly transactionEffect = effect(() => {
    const current = this.transaction();
    if (current) {
      this.setFormValue({
        title: current.title,
        amount: current.amount,
        category: current.category,
        date: new Date(current.date),
        type: current.type,
      });
      return;
    }
    this.setFormValue({
      title: '',
      amount: null,
      category: '',
      date: new Date(),
      type: 'expense',
    });
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, amount, category, date, type } = this.form.getRawValue();
    const parsed = typeof date === 'string' ? new Date(date) : date;
    const safeDate = parsed ?? new Date();
    const payload = {
      title,
      amount: amount ?? 0,
      category: category as TransactionCategory,
      date: safeDate.toISOString(),
      type,
    };
    const current = this.transaction();
    if (current) {
      this.updated.emit({ id: current.id, changes: payload });
      return;
    }
    this.submitted.emit(payload);
    this.resetForm(safeDate, type);
  }

  cancelEdit(): void {
    this.cancelled.emit();
  }

  private resetForm(date: Date, type: TransactionType): void {
    this.setFormValue({
      title: '',
      amount: null,
      category: '',
      date,
      type,
    });
  }

  private setFormValue(values: {
    title: string;
    amount: number | null;
    category: string;
    date: Date;
    type: TransactionType;
  }): void {
    this.form.reset(values);
    Object.values(this.form.controls).forEach((control) => {
      control.setErrors(null);
    });
  }
}
