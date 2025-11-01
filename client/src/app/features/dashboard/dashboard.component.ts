import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <button class="btn-logout" (click)="onLogout()">
          Logout
        </button>
      </header>

      <div class="dashboard-content">
        @if (authService.currentUser(); as user) {
          <div class="welcome-card">
            <h2>Welcome back, {{ user.firstName || user.email }}!</h2>
            <p class="user-info">
              <strong>Email:</strong> {{ user.email }}
            </p>
            <p class="user-info">
              <strong>Roles:</strong> {{ user.roles.join(', ') }}
            </p>
          </div>

          <div class="cards-grid">
            <div class="card">
              <div class="card-icon">??</div>
              <h3>Analytics</h3>
              <p>View your analytics and statistics</p>
            </div>

            <div class="card">
              <div class="card-icon">??</div>
              <h3>Reports</h3>
              <p>Generate and view reports</p>
            </div>

            <div class="card">
              <div class="card-icon">??</div>
              <h3>Settings</h3>
              <p>Manage your account settings</p>
            </div>

            @if (authService.hasRole('admin')) {
              <div class="card card-admin">
                <div class="card-icon">??</div>
                <h3>Admin Panel</h3>
                <p>Access administrative features</p>
                <a routerLink="/admin" class="card-link">Go to Admin ?</a>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: #f7fafc;
    }

    .dashboard-header {
      background: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard-header h1 {
      margin: 0;
      font-size: 1.75rem;
      color: #1a202c;
      font-weight: 700;
    }

    .btn-logout {
      padding: 0.625rem 1.25rem;
      background: #e53e3e;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-logout:hover {
      background: #c53030;
      transform: translateY(-1px);
    }

    .dashboard-content {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .welcome-card h2 {
      margin: 0 0 1rem 0;
      font-size: 1.75rem;
    }

    .user-info {
      margin: 0.5rem 0;
      opacity: 0.95;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
      position: relative;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .card h3 {
      margin: 0 0 0.5rem 0;
      color: #2d3748;
      font-size: 1.25rem;
    }

    .card p {
      margin: 0;
      color: #718096;
    }

    .card-admin {
      border: 2px solid #667eea;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .card-link {
      display: inline-block;
      margin-top: 1rem;
      color: #667eea;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
    }

    .card-link:hover {
      color: #764ba2;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        padding: 1rem;
      }

      .dashboard-content {
        padding: 1rem;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  readonly authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }
}
