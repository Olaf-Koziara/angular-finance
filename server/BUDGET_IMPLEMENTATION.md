# Budget Feature - Server Implementation

## Overview
Complete server-side implementation of the Budget feature with CRUD operations, validation, and comprehensive testing.

## What Was Created

### 1. Database Schema (`prisma/schema.prisma`)
Added two new models:
- **Budget**: Stores user's general budget with one-to-one relationship to User
- **CategoryBudget**: Stores category-specific budgets with many-to-one relationship to Budget

### 2. Database Migration
- **Location**: `prisma/migrations/20251225095501_add_budgets/migration.sql`
- Creates `budgets` and `category_budgets` tables with proper indexes and foreign keys
- **Note**: Migration file created but not yet applied due to database permission issues

### 3. Validators (`src/validators/budget.validator.ts`)
Zod schemas for input validation:
- `createBudgetSchema`: Validates new budget creation
- `updateGeneralBudgetSchema`: Validates general budget updates
- `updateCategoryBudgetSchema`: Validates category budget updates
- `updateBudgetSchema`: Validates full budget updates

### 4. Service Layer (`src/services/budget.service.ts`)
Complete CRUD operations:
- `getBudget(userId)`: Get user's budget with all category budgets
- `create(userId, data)`: Create new budget
- `updateGeneralBudget(userId, data)`: Update general budget amount
- `updateCategoryBudget(userId, data)`: Update or create category budget
- `update(userId, data)`: Update entire budget (general + categories)
- `delete(userId)`: Delete user's budget

### 5. Controller (`src/controllers/budget.controller.ts`)
HTTP request handlers for all budget endpoints:
- `GET /api/budgets`: Get user budget
- `POST /api/budgets`: Create new budget
- `PUT /api/budgets`: Update entire budget
- `PUT /api/budgets/general`: Update general budget only
- `PUT /api/budgets/category`: Update/create category budget
- `DELETE /api/budgets`: Delete budget

### 6. Routes (`src/routes/budget.routes.ts`)
- All routes protected with authentication middleware
- Integrated into main router at `/api/budgets`

### 7. Tests (`src/tests/budget.test.ts`)
Comprehensive test suite covering:
- Budget creation with validation
- Getting budget data
- Updating general budget
- Updating category budgets
- Full budget updates
- Budget deletion
- Authentication checks
- Error handling

## API Endpoints

### Get User Budget
```http
GET /api/budgets
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "generalBudget": 5000,
  "categoryBudgets": [
    {
      "id": "uuid",
      "category": "Food",
      "amount": 500
    }
  ],
  "createdAt": "2024-12-25T10:00:00Z",
  "updatedAt": "2024-12-25T10:00:00Z"
}
```

### Create Budget
```http
POST /api/budgets
Authorization: Bearer {token}
Content-Type: application/json

{
  "generalBudget": 5000,
  "categoryBudgets": [
    {
      "category": "Food",
      "amount": 500
    },
    {
      "category": "Transport",
      "amount": 300
    }
  ]
}
```

### Update General Budget
```http
PUT /api/budgets/general
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 6000
}
```

### Update Category Budget
```http
PUT /api/budgets/category
Authorization: Bearer {token}
Content-Type: application/json

{
  "category": "Food",
  "amount": 700
}
```

### Update Entire Budget
```http
PUT /api/budgets
Authorization: Bearer {token}
Content-Type: application/json

{
  "generalBudget": 7000,
  "categoryBudgets": [
    {
      "category": "Food",
      "amount": 600
    }
  ]
}
```

### Delete Budget
```http
DELETE /api/budgets
Authorization: Bearer {token}
```

## Running the Migration

When you have proper database access, run:

```bash
cd server
npx prisma migrate deploy
```

Or for development:

```bash
npx prisma migrate dev
```

This will apply the migration and create the `budgets` and `category_budgets` tables.

## Running Tests

To run the budget tests:

```bash
cd server
npm test -- budget.test.ts
```

To run all tests:

```bash
npm test
```

## Integration with Frontend

The frontend budget service (`client/src/app/features/budget/services/budget.service.ts`) is already configured to use these endpoints. Update the commented API calls in the service to use the real backend.

Example:
```typescript
getBudget(): Observable<Budget> {
  return this.http.get<BudgetResponse>(this.apiUrl).pipe(
    map((response) => response.data),
    catchError((error) => {
      console.error('Error fetching budget:', error);
      throw error;
    })
  );
}
```

## Features

✅ Full CRUD operations for budgets
✅ User-specific budgets (one budget per user)
✅ Category-based budget allocation
✅ Input validation with Zod
✅ Proper error handling
✅ Authentication required for all endpoints
✅ Decimal precision for monetary values
✅ Comprehensive test coverage
✅ TypeScript type safety
✅ RESTful API design

## Database Schema Details

### Budgets Table
- `id`: UUID primary key
- `userId`: UUID foreign key to users (unique)
- `generalBudget`: Decimal(10,2)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Category Budgets Table
- `id`: UUID primary key
- `budgetId`: UUID foreign key to budgets
- `category`: String
- `amount`: Decimal(10,2)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp
- Unique constraint on (budgetId, category)

## Next Steps

1. Apply the database migration when you have proper access
2. Update the frontend service to use real API calls instead of mocks
3. Test the integration between frontend and backend
4. Consider adding budget analytics/statistics endpoints if needed






