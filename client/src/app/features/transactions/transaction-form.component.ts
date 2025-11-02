import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionInput, TransactionType } from '../../core/transactions/transaction.model';

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
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly saved = output<TransactionInput>();

  readonly form = this.fb.group({
    amount: this.fb.control(0, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    category: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    date: this.fb.control(new Date(), {
      validators: [Validators.required],
    }),
    type: this.fb.control<TransactionType>('expense', {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { amount, category, date, type } = this.form.getRawValue();

    this.saved.emit({
      amount: Number(amount),
      category,
      date,
      type,
    });

    this.form.reset({ amount: 0, category: '', date: new Date(), type: 'expense' });
  }
}
