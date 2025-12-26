
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    computed,
    effect,
    inject,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormControlStatus,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService, RegisterPayload } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);
  readonly registeredEmail = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(100),
        // Password must contain at least one uppercase, one lowercase, and one number
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]],
  });

  readonly formStatus = signal<FormControlStatus>(this.form.status as FormControlStatus);

  readonly nameInvalid = computed(() => controlInvalid(this.form.controls.name, this.formStatus));
  readonly emailInvalid = computed(() => controlInvalid(this.form.controls.email, this.formStatus));
  readonly passwordInvalid = computed(() => controlInvalid(this.form.controls.password, this.formStatus));
  readonly confirmPasswordInvalid = computed(() => {
    this.formStatus();
    return (
      controlInvalid(this.form.controls.confirmPassword, this.formStatus) ||
      this.passwordMismatch()
    );
  });
  readonly termsInvalid = computed(() => {
    this.formStatus();
    const control = this.form.controls.terms;
    return control.invalid && (control.dirty || control.touched);
  });

  readonly passwordMismatch = computed(() => {
    this.formStatus();
    const password = this.form.controls.password.value;
    const confirm = this.form.controls.confirmPassword.value;
    return !!password && !!confirm && password !== confirm;
  });

  readonly passwordStrengthPercent = computed(() => {
    this.formStatus();
    return scorePassword(this.form.controls.password.value);
  });
  readonly passwordStrengthLabel = computed(() => {
    const value = this.passwordStrengthPercent();
    if (value >= 80) {
      return 'Strong password';
    }
    if (value >= 50) {
      return 'Good password';
    }
    if (value >= 30) {
      return 'Fair password';
    }
    if (value > 0) {
      return 'Weak password';
    }
    return 'Password strength';
  });
  readonly passwordStrengthColor = computed(() => {
    const value = this.passwordStrengthPercent();
    if (value >= 80) {
      return 'primary';
    }
    if (value >= 50) {
      return 'accent';
    }
    return 'warn';
  });
  readonly showPasswordStrength = computed(() => {
    this.formStatus();
    return !!this.form.controls.password.value;
  });

  readonly submitDisabled = computed(
    () =>
      this.loading() ||
      this.formStatus() !== 'VALID' ||
      this.passwordMismatch(),
  );

  readonly loginPrefill = computed(() => {
    const email = this.registeredEmail();
    return email ? { email } : undefined;
  });

  private readonly formStatusSync = effect((onCleanup) => {
    const subscription = this.form.statusChanges.subscribe((status) =>
      this.formStatus.set(status as FormControlStatus),
    );
    onCleanup(() => subscription.unsubscribe());
  });

  private readonly confirmPasswordSync = effect(() => {
    const mismatch = this.passwordMismatch();
    const control = this.form.controls.confirmPassword;
    const errors = control.errors ?? {};
    if (mismatch && !errors['mismatch']) {
      control.setErrors({ ...errors, mismatch: true });
      return;
    }
    if (!mismatch && errors['mismatch']) {
      const { mismatch: _, ...rest } = errors;
      control.setErrors(Object.keys(rest).length ? rest : null);
    }
  });

  private readonly successAutoHide = effect((onCleanup) => {
    if (!this.success()) {
      return;
    }
    const timeout = setTimeout(() => {
      this.success.set(false);
      this.registeredEmail.set(null);
    }, 5000);
    onCleanup(() => clearTimeout(timeout));
  });

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword.set(!this.showPassword());
      return;
    }
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  submit(): void {
    if (this.submitDisabled()) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RegisterPayload = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    this.authService
      .register(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: () => {
          // Registration successful - user is now logged in
          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          const message =
            err?.error?.message ?? 'Unable to create the account right now.';
          this.error.set(message);
        },
      });
  }
}

function controlInvalid(control: AbstractControl | null, status: () => FormControlStatus): boolean {
  status();
  if (!control) {
    return false;
  }
  return control.invalid && (control.dirty || control.touched);
}

function scorePassword(value: string | null): number {
  if (!value) {
    return 0;
  }
  let score = Math.min(10, value.length) * 5;
  if (/[A-Z]/.test(value)) {
    score += 10;
  }
  if (/[a-z]/.test(value)) {
    score += 10;
  }
  if (/\d/.test(value)) {
    score += 10;
  }
  if (/[^A-Za-z0-9]/.test(value)) {
    score += 10;
  }
  if (new Set(value).size >= 6) {
    score += 10;
  }
  return Math.min(score, 100);
}