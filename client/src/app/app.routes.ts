import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'dashboard',

  // },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/authenticated-template/authenticated-template').then(
        (m) => m.AuthenticatedTemplateComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          pageTranslationName: 'DASHBOARD',
        },
      },
      {
        path: 'budget',
        loadComponent: () =>
          import('./features/budget/pages/budget-page.component').then(
            (m) => m.BudgetPageComponent
          ),
        data: {
          pageTranslationName: 'BUDGET',
        },
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./features/transactions/pages/transactions-page.component').then(
            (m) => m.TransactionsPageComponent
          ),
        data: {
          pageTranslationName: 'TRANSACTIONS',
        },
      },
  
    ],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
