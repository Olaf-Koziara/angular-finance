import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <div class="header-content">
          <h1>?? Admin Panel</h1>
          <div class="header-actions">
            <button routerLink="/dashboard" class="btn-secondary">
              ? Back to Dashboard
            </button>
            <button class="btn-logout" (click)="onLogout()">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div class="admin-content">
        @if (authService.currentUser(); as user) {
          <div class="admin-info">
            <h2>Administrator Access</h2>
            <p>Logged in as: <strong>{{ user.email }}</strong></p>
            <p>Roles: <span class="badge">{{ user.roles.join(', ') }}</span></p>
          </div>

          <div class="admin-grid">
            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>User Management</h3>
              </div>
              <p>Manage user accounts, roles, and permissions</p>
              <ul class="feature-list">
                <li>Create and edit users</li>
                <li>Assign roles and permissions</li>
                <li>Monitor user activity</li>
              </ul>
              <button class="btn-primary">Manage Users</button>
            </div>

            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>System Analytics</h3>
              </div>
              <p>View system statistics and reports</p>
              <ul class="feature-list">
                <li>Real-time metrics</li>
                <li>Usage statistics</li>
                <li>Performance monitoring</li>
              </ul>
              <button class="btn-primary">View Analytics</button>
            </div>

            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>System Settings</h3>
              </div>
              <p>Configure system-wide settings</p>
              <ul class="feature-list">
                <li>Application configuration</li>
                <li>Security settings</li>
                <li>Integration management</li>
              </ul>
              <button class="btn-primary">Configure System</button>
            </div>

            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>Security</h3>
              </div>
              <p>Manage security and access control</p>
              <ul class="feature-list">
                <li>Authentication settings</li>
                <li>Access logs</li>
                <li>Security policies</li>
              </ul>
              <button class="btn-primary">Security Settings</button>
            </div>

            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>Audit Logs</h3>
              </div>
              <p>View system and user activity logs</p>
              <ul class="feature-list">
                <li>User activity tracking</li>
                <li>System event logs</li>
                <li>Compliance reports</li>
              </ul>
              <button class="btn-primary">View Logs</button>
            </div>

            <div class="admin-card">
              <div class="card-header">
                <span class="card-icon">??</span>
                <h3>Notifications</h3>
              </div>
              <p>Manage system notifications</p>
              <ul class="feature-list">
                <li>Email templates</li>
                <li>Notification rules</li>
                <li>Alert configuration</li>
              </ul>
              <button class="btn-primary">Manage Notifications</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      background: #f7fafc;
    }

    .admin-header {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      color: white;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .admin-header h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-secondary {
      padding: 0.625rem 1.25rem;
      background: #4a5568;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-secondary:hover {
      background: #2d3748;
      transform: translateY(-1px);
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

    .admin-content {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .admin-info {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .admin-info h2 {
      margin: 0 0 1rem 0;
      color: #1a202c;
    }

    .admin-info p {
      margin: 0.5rem 0;
      color: #4a5568;
    }

    .badge {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .admin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .admin-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
    }

    .admin-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 2rem;
    }

    .card-header h3 {
      margin: 0;
      color: #2d3748;
      font-size: 1.25rem;
    }

    .admin-card p {
      margin: 0 0 1rem 0;
      color: #718096;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
    }

    .feature-list li {
      padding: 0.5rem 0;
      color: #4a5568;
      position: relative;
      padding-left: 1.5rem;
    }

    .feature-list li::before {
      content: "?";
      position: absolute;
      left: 0;
      color: #48bb78;
      font-weight: bold;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .admin-grid {
        grid-template-columns: 1fr;
      }

      .admin-content {
        padding: 1rem;
      }
    }
  `]
})
export class AdminComponent {
  readonly authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }
}
