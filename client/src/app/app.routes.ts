import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.component').then((m) => m.DashboardComponent),
  },
  // {
  //   path: 'admin',
  //   canActivate: [authGuard, roleGuard(['admin'])],
  //   loadComponent: () =>
  //     import('./features/admin/pages/admin.component').then((m) => m.AdminComponent),
  // },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
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
  {
    path: '**',
    redirectTo: '',
  },
];
