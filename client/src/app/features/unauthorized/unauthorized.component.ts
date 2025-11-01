import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-content">
        <div class="icon">??</div>
        <h1>Access Denied</h1>
        <p class="message">
          You don't have permission to access this page.
        </p>
        <p class="description">
          This page requires specific roles or permissions that your account doesn't have.
          Please contact your administrator if you believe this is an error.
        </p>
        <div class="actions">
          <button routerLink="/dashboard" class="btn-primary">
            Go to Dashboard
          </button>
          <button routerLink="/login" class="btn-secondary">
            Login with Different Account
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 2rem;
    }

    .unauthorized-content {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      max-width: 500px;
    }

    .icon {
      font-size: 5rem;
      margin-bottom: 1rem;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    h1 {
      margin: 0 0 1rem 0;
      font-size: 2.5rem;
      color: #1a202c;
      font-weight: 700;
    }

    .message {
      font-size: 1.25rem;
      color: #4a5568;
      margin: 0 0 1rem 0;
      font-weight: 500;
    }

    .description {
      color: #718096;
      line-height: 1.6;
      margin: 0 0 2rem 0;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #edf2f7;
      color: #2d3748;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
      transform: translateY(-2px);
    }

    @media (max-width: 640px) {
      .unauthorized-content {
        padding: 2rem;
      }

      h1 {
        font-size: 2rem;
      }

      .icon {
        font-size: 4rem;
      }
    }
  `]
})
export class UnauthorizedComponent {}
