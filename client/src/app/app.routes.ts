import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/transactions/pages/transactions-page.component').then(
        m => m.TransactionsPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
