import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dashboard" data-testid="dashboard">
      <h1>Welcome back</h1>
      <p *ngIf="userName(); else guest">{{ userName() }}</p>
      <ng-template #guest><p>Sign in to access your personalised dashboard.</p></ng-template>
    </section>
  `,
  styles: [
    `
      .dashboard {
        padding: 2rem;
      }
    `,
  ],
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  readonly userName = computed(() => this.authService.getUserSnapshot()?.displayName ?? null);
}
