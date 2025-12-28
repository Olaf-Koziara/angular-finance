# Copilot Instructions for Angular Finance

This project is a full-stack personal finance application with an Angular frontend (client) and Node.js/Express backend (server).

## General Principles

Act as a senior Angular/Node.js developer. Make code as simple as possible, clean, readable, performant, and scalable.

### Code Quality Standards

- **Simplicity First**: Write the simplest solution that works correctly
- **Readability**: Code should be self-documenting; use clear variable and function names
- **Performance**: Consider performance implications, especially for database queries and API calls
- **Scalability**: Design code that can grow with the application
- **Type Safety**: Leverage TypeScript's type system to the fullest extent

## TypeScript Standards

### Configuration

Both client and server use **strict TypeScript mode** with the following enabled:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

### Code Style

- **Indentation**: Use 2 spaces (never tabs)
- **Quotes**: Use single quotes for strings (enforced by EditorConfig and Prettier)
- **Line Length**: Maximum 100 characters (Prettier config)
- **Semicolons**: Always use semicolons
- **Async/Await**: Always use async/await, never callbacks
- **Type Annotations**: Explicitly type function parameters and return values
- **Naming Conventions**:
  - `camelCase` for variables, functions, and methods
  - `PascalCase` for classes, interfaces, and types
  - `UPPER_SNAKE_CASE` for constants
  - Prefix interfaces with `I` only when needed to avoid naming conflicts

## Angular (Client) Guidelines

### Project Structure

```
client/src/app/
├── core/              # Singleton services, guards, interceptors
├── features/          # Feature modules organized by domain
├── shared/            # Shared components, directives, pipes
└── app.ts            # Root component
```

### Component Standards

- **Standalone Components**: Use standalone components (Angular 21+)
- **Signal-based State**: Use Angular signals for reactive state management
  ```typescript
  protected readonly title = signal('angular-finance');
  ```
- **Dependency Injection**: Use `inject()` function in functional guards and interceptors
  ```typescript
  const authService = inject(AuthService);
  const router = inject(Router);
  ```
- **Component Naming**: Use descriptive names (e.g., `SidebarComponent`, not `SideComponent`)
- **File Organization**: Colocate template and styles with components
  - Component: `component-name.component.ts`
  - Template: `component-name.component.html`
  - Styles: `component-name.component.scss`
  - Tests: `component-name.component.spec.ts`

### Angular Best Practices

1. **Immutability**: Treat state as immutable; use signals for reactive updates
2. **OnPush Change Detection**: Consider using OnPush change detection for performance
3. **Lazy Loading**: Lazy load feature modules where appropriate
4. **Guards**: Use functional guards (`CanActivateFn`) over class-based guards
5. **Interceptors**: Use functional interceptors for HTTP middleware
6. **Routing**: Define clear route structures with proper guards
7. **i18n**: This project uses `@ngx-translate` for internationalization
8. **Forms**: Use reactive forms with proper validation
9. **Accessibility**: Follow WCAG guidelines for accessible components
10. **Testing**: Write unit tests for components, services, and guards using Jasmine/Karma

### RxJS Standards

- Use operators for data transformation
- Always unsubscribe from observables (use `takeUntilDestroyed()` or async pipe)
- Prefer declarative approach over imperative subscriptions
- Use appropriate operators: `map`, `filter`, `switchMap`, `catchError`

## Node.js/Express (Server) Guidelines

### Project Structure

```
server/src/
├── config/            # Configuration files (database, environment)
├── controllers/       # Route controllers
├── middleware/        # Express middleware
├── routes/           # API routes
├── services/         # Business logic
├── validators/       # Zod validation schemas
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── constants/        # Application constants
├── tests/            # Test files
└── app.ts            # Express app setup
```

### API Design

- **RESTful Conventions**: Follow REST principles for endpoint design
- **HTTP Methods**: Use appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE)
- **Status Codes**: Return correct HTTP status codes
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation errors)
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 409: Conflict
  - 500: Internal Server Error

### Response Format

All API responses must use the standardized format via `sendSuccess()` utility:

```typescript
// Success response
sendSuccess(res, data, 'Success message', 201);
// Results in:
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}

// Error response (handled by error middleware)
{
  "success": false,
  "message": "Error message",
  "errors": { /* optional validation errors */ }
}
```

### Controller Pattern

Controllers should:
1. Extract validated data from request
2. Call service methods for business logic
3. Use `sendSuccess()` for responses
4. Pass errors to `next()` for middleware handling
5. Never contain business logic

Example:
```typescript
async login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data: LoginInput = req.body;
    const result = await authService.login(data);
    sendSuccess(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
}
```

### Service Pattern

Services should:
1. Contain all business logic
2. Interact with the database (Prisma)
3. Throw custom errors (from `utils/errors.ts`)
4. Use async/await consistently
5. Log important operations with `logger`

### Validation

- **Zod Schemas**: Use Zod for all input validation
- **Middleware**: Apply validation middleware to routes
- **Type Inference**: Use `z.infer<typeof schema>` for TypeScript types
- **Error Messages**: Provide clear, user-friendly validation messages

Example:
```typescript
export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

### Security Best Practices

1. **Authentication**: Use JWT tokens (access + refresh token pattern)
2. **Password Security**: Hash passwords with bcrypt (min 10 rounds)
3. **HttpOnly Cookies**: Store refresh tokens in HttpOnly cookies
4. **Cookie Settings**:
   - `httpOnly: true` (XSS protection)
   - `secure: true` in production (HTTPS only)
   - `sameSite: 'strict'` (CSRF protection)
5. **Input Validation**: Validate all user input with Zod
6. **Error Handling**: Never expose sensitive information in error messages
7. **Rate Limiting**: Consider rate limiting for authentication endpoints
8. **Helmet**: Use Helmet for security headers
9. **CORS**: Configure CORS properly for frontend origin
10. **Environment Variables**: Never commit secrets; use `.env` files

### Database (Prisma)

- **ORM**: Use Prisma Client for all database operations
- **Migrations**: Always create migrations for schema changes
- **Type Safety**: Leverage Prisma's generated types
- **Transactions**: Use Prisma transactions for multi-step operations
- **Error Handling**: Handle Prisma-specific errors appropriately
- **Connection Management**: Use the singleton pattern for Prisma client

### Error Handling

- **Custom Errors**: Use custom error classes from `utils/errors.ts`
  - `NotFoundError` (404)
  - `ValidationError` (400)
  - `AuthenticationError` (401)
  - `AuthorizationError` (403)
  - `ConflictError` (409)
- **Middleware**: Use centralized error handling middleware
- **Logging**: Log errors with appropriate context

### Testing

- **Framework**: Use Jest for unit and integration tests
- **API Testing**: Use Supertest for API endpoint testing
- **Coverage**: Aim for high test coverage on critical paths
- **Test Structure**: Follow Arrange-Act-Assert pattern
- **Mocking**: Mock external dependencies (database, third-party APIs)

### Development Guidelines

1. **Always use async/await**, never callbacks
2. **Always validate input** with Zod schemas
3. **Always handle errors** explicitly (try/catch in controllers)
4. **Always use standardized response format**
5. **Always use TypeScript strict mode**
6. **Always include proper HTTP status codes**
7. **Always use middleware** for cross-cutting concerns (auth, validation, logging)
8. **Always log important operations** (registration, login, errors)
9. **Always use environment variables** for configuration
10. **Never commit sensitive data** (passwords, tokens, API keys)

## Testing Standards

### Client (Angular)

- Use Jasmine/Karma for unit tests
- Test components, services, guards, and interceptors
- Mock dependencies with spies
- Test both success and error scenarios
- Run tests with: `npm test` (in client directory)

### Server (Node.js)

- Use Jest for unit and integration tests
- Test controllers, services, middleware, and utilities
- Use Supertest for API endpoint testing
- Mock Prisma client in unit tests
- Test authentication flows and error handling
- Run tests with: `npm test` (in server directory)

## Git Commit Messages

Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code refactoring
- `docs:` Documentation changes
- `test:` Test additions or modifications
- `chore:` Build process or auxiliary tool changes
- `style:` Code style changes (formatting)
- `perf:` Performance improvements

Example: `feat: add user profile update endpoint`

## Documentation

- **Code Comments**: Use JSDoc for functions and classes when the purpose isn't obvious
- **README**: Keep README files up-to-date for both client and server
- **API Documentation**: Document all API endpoints with request/response examples
- **Type Documentation**: Document complex types and interfaces

## Performance Considerations

### Client
- Lazy load routes and modules
- Use OnPush change detection
- Optimize bundle size (tree-shaking, code splitting)
- Use trackBy with `*ngFor`
- Avoid unnecessary subscriptions

### Server
- Use database indexes appropriately
- Implement pagination for large datasets
- Use database query optimization (select only needed fields)
- Consider caching strategies for frequently accessed data
- Use compression middleware for responses

## Accessibility

- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper heading hierarchy
- Test with screen readers
- Ensure sufficient color contrast

## When in Doubt

1. **Keep it simple**: Choose the straightforward solution
2. **Follow existing patterns**: Look at similar code in the codebase
3. **Prioritize readability**: Code is read more often than written
4. **Ask for clarification**: Better to ask than to assume
5. **Test thoroughly**: Write tests before pushing code
