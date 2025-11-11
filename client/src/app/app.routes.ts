import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.component').then((m) => m.DashboardComponent),
    data: {
      pageTranslationName: 'DASHBOARD',
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
  {
    path: '**',
    redirectTo: '',
  },
];
