import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterLink, MatFormFieldModule,MatLabel],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  readonly formStatus = toSignal(
    this.form.statusChanges.pipe(startWith(this.form.status)),
  );
  readonly submitDisabled = computed(() => this.loading() || this.formStatus() !== "VALID")
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
