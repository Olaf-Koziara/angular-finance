import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="auth-container" data-testid="login">
      <h1>Sign in</h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label class="form-field">
          <span>Email</span>
          <input
            type="email"
            formControlName="email"
            autocomplete="username"
            [attr.aria-invalid]="emailInvalid()"
          />
          <small *ngIf="emailInvalid()">Enter a valid email</small>
        </label>

        <label class="form-field">
          <span>Password</span>
          <input
            type="password"
            formControlName="password"
            autocomplete="current-password"
            [attr.aria-invalid]="passwordInvalid()"
          />
          <small *ngIf="passwordInvalid()">Password is required</small>
        </label>

        <button type="submit" [disabled]="submitDisabled()">
          {{ loading() ? 'Signing in?' : 'Sign in' }}
        </button>
      </form>

      <p class="error" *ngIf="error()">{{ error() }}</p>
    </section>
  `,
  styles: [
    `
      .auth-container {
        max-width: 360px;
        margin: 0 auto;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      input {
        padding: 0.75rem;
        border: 1px solid #d0d5dd;
        border-radius: 0.5rem;
        font-size: 1rem;
      }

      input[aria-invalid='true'] {
        border-color: #f97066;
      }

      button {
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: none;
        background: #155eef;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }

      button[disabled] {
        background: #94a3b8;
        cursor: not-allowed;
      }

      .error {
        color: #f97066;
      }
    `,
  ],
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly submitDisabled = computed(() => this.loading() || this.form.invalid);
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

  submit(): void {
    if (this.submitDisabled()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

    this.authService
      .login(this.form.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl(returnUrl || '/');
        },
        error: (err) => {
          const message = err?.error?.message || 'Unable to sign in. Try again later.';
          this.error.set(message);
        },
      });
  }
}
