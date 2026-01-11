# Angular Finance

A full-stack personal finance management application built with Angular 21 and Node.js/Express. The application enables users to track income and expenses, manage budgets by category, and visualize financial trends through an interactive dashboard.

## Technology Stack

### Frontend
- Angular 21 with standalone components and signals-based state management
- Angular Material and Tailwind CSS for styling
- RxJS for reactive programming
- ngx-translate for internationalization

### Backend
- Node.js with Express.js
- TypeScript with strict mode
- Prisma ORM with PostgreSQL
- JWT authentication with refresh token rotation
- Zod schema validation

## Project Structure

```
angular-finance/
├── client/                 # Angular frontend application
│   └── src/app/
│       ├── core/           # Auth guards, interceptors, layout
│       ├── features/       # Feature modules (dashboard, transactions, budget)
│       └── shared/         # Reusable components, pipes, services
└── server/                 # Node.js backend API
    └── src/
        ├── controllers/    # Request handlers
        ├── services/       # Business logic
        ├── middleware/     # Auth, validation, error handling
        └── validators/     # Zod schemas
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Backend Setup

```bash
cd server
npm install
cp .env.example .env    # Configure database and JWT secrets
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

The application runs at `http://localhost:4200` with the API at `http://localhost:3000`.

## Case Study: Real-Time Dashboard with Signal-Based Architecture

### Challenge

Building a financial dashboard that displays real-time summary cards, budget progress charts, and monthly trends while maintaining optimal performance and a clean reactive architecture.

### Solution

The dashboard implementation demonstrates several advanced Angular patterns:

**Signal-Based State Management**

The `DashboardService` exposes computed signals that automatically update when underlying data changes:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly financialSummary = this.dashboardService.financialSummary;
  readonly trends = this.dashboardService.trends;
  readonly budgetCategories = this.dashboardService.budgetCategories;
  readonly monthlyData = this.dashboardService.monthlyData;
}
```

**Computed Derived State**

Summary cards are computed from multiple data sources with automatic trend calculations:

```typescript
summaryCards = computed(() => {
  const summary = this.financialSummary();
  const monthly = this.monthlyData();
  const current = monthly.at(-1);
  const prev = monthly.at(-2);

  const currentNet = current ? current.income - current.expenses : 0;
  const prevNet = prev ? prev.income - prev.expenses : 0;

  return [
    { type: 'balance', label: 'DASHBOARD.BALANCE', value: summary.balance, trend: percentChange(currentNet, prevNet) },
    { type: 'income', label: 'DASHBOARD.INCOME', value: summary.income, trend: percentChange(current?.income ?? 0, prev?.income ?? 0) },
  ];
});

function percentChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / Math.abs(previous)) * 100;
}
```

**Standalone Components with Lazy Loading**

Each feature module uses standalone components with route-level lazy loading:

```typescript
{
  path: 'transactions',
  loadComponent: () =>
    import('./features/transactions/pages/transactions-page.component')
      .then((m) => m.TransactionsPageComponent),
}
```

**Functional Guards and Interceptors**

Authentication uses the functional guard pattern with inject():

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
```

### Result

The architecture delivers:
- Automatic UI updates through signal reactivity without manual subscription management
- OnPush change detection compatibility for optimal rendering performance
- Minimal bundle size through lazy loading of feature modules
- Type-safe state management without external state libraries
- Clean separation between presentation and business logic

## API Documentation

See [server/README.md](./server/README.md) for detailed API endpoint documentation.

## Testing

```bash
# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test
```

## License

ISC
