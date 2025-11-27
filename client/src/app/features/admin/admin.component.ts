import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="admin" data-testid="admin">
      <h1>Admin Panel</h1>
      <p>Welcome to the admin area. Only users with admin role can access this page.</p>
      <a routerLink="/" class="link">Back to dashboard</a>
    </section>
  `,
  styles: [
    `
      .admin {
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
export class AdminComponent {}
