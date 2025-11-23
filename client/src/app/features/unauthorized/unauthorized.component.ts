import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="unauthorized" data-testid="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this area.</p>
      <a routerLink="/" class="link">Back to dashboard</a>
    </section>
  `,
  styles: [
    `
      .unauthorized {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .link {
        color: #155eef;
        text-decoration: underline;
      }
    `,
  ],
})
export class UnauthorizedComponent {}
