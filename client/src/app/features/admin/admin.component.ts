import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="admin" data-testid="admin">
      <h1>Admin Area</h1>
      <p>Only users with the admin role can see this content.</p>
    </section>
  `,
  styles: [
    `
      .admin {
        padding: 2rem;
      }
    `,
  ],
})
export class AdminComponent {}
