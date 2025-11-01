import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/admin" routerLinkActive="active">Admin</a>
        </nav>
      </aside>

      <main class="content">
        <ng-content></ng-content>
      </main>
    </div>
  `,
  styles: [
    `
      .layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        min-height: 100vh;
      }

      .sidebar {
        padding: 1.5rem;
        background: #0f172a;
        color: white;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .content {
        padding: 2rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: 600;
      }

      a.active {
        text-decoration: underline;
      }
    `,
  ],
})
export class SidebarComponent {}
