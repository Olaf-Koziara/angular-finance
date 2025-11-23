import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/auth/auth.service';

// Custom password validator
function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const isLengthValid = value.length >= 8;

  const passwordValid = hasUpperCase && hasLowerCase && hasNumber && isLengthValid;

  return !passwordValid ? { 
    passwordStrength: {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isLengthValid
    }
  } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: this.passwordMatchValidator,
  });

  readonly submitDisabled = computed(() => this.loading() || this.form.invalid);
  
  readonly nameInvalid = computed(
    () =>
      this.form.controls.name.invalid &&
      (this.form.controls.name.dirty || this.form.controls.name.touched)
  );
  
  readonly emailInvalid = computed(
    () =>
      this.form.controls.email.invalid &&
      (this.form.controls.email.dirty || this.form.controls.email.touched)
  );
  
  readonly passwordInvalid = computed(
    () =>
      this.form.controls.password.invalid &&
      (this.form.controls.password.dirty || this.form.controls.password.touched)
  );

  readonly confirmPasswordInvalid = computed(
    () =>
      (this.form.controls.confirmPassword.invalid || this.form.hasError('passwordMismatch')) &&
      (this.form.controls.confirmPassword.dirty || this.form.controls.confirmPassword.touched)
  );

  readonly passwordStrength = computed(() => {
    const password = this.form.controls.password.value;
    const errors = this.form.controls.password.errors;
    
    if (!password) return null;

    return {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      isLengthValid: password.length >= 8,
      isValid: !errors?.['passwordStrength']
    };
  });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(v => !v);
  }

  submit(): void {
    if (this.submitDisabled()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { confirmPassword, ...registerData } = this.form.getRawValue();

    this.authService
      .register(registerData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          let message = 'Registration failed. Please try again.';
          
          if (err?.error?.message) {
            message = err.error.message;
          } else if (err?.error?.errors && typeof err.error.errors === 'object') {
            // Handle validation errors from server
            const errors = err.error.errors as Record<string, string[]>;
            const errorMessages = Object.values(errors)
              .filter(val => Array.isArray(val))
              .flat()
              .filter(msg => typeof msg === 'string');
            message = errorMessages.length > 0 ? errorMessages.join(', ') : message;
          }
          
          this.error.set(message);
        },
      });
  }
}
