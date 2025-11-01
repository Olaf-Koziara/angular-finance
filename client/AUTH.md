# JWT Authentication Implementation with Functional Guards

## ?? Overview

This implementation follows Angular 20 best practices using:
- ? **Functional Guards** (`CanActivateFn`)
- ? **Functional HTTP Interceptors** (`HttpInterceptorFn`)
- ? **inject() function** for dependency injection
- ? **Signals** for reactive state management
- ? **Zero external dependencies** for core auth logic
- ? **SOLID & DRY principles**

## ??? Architecture

```
src/app/
??? auth/
?   ??? auth.models.ts          # TypeScript interfaces
?   ??? auth.service.ts         # Core authentication logic
?   ??? auth.interceptor.ts     # HTTP interceptor for JWT
?   ??? auth.guard.ts           # Functional route guards
?   ??? login.component.ts      # Login UI
??? features/
?   ??? dashboard/              # Protected: requires authentication
?   ??? admin/                  # Protected: requires admin role
?   ??? unauthorized/           # Public access denied page
??? app.config.ts               # App configuration with interceptor
```

## ?? Core Components

### 1. AuthService (`auth.service.ts`)

**Purpose**: Centralized authentication state management

**Key Features**:
- JWT token storage in sessionStorage
- User state management with signals
- Token decoding and validation
- Automatic session restoration
- Token refresh mechanism

**Usage**:
```typescript
const authService = inject(AuthService);

// Login
authService.login({ email, password }).subscribe();

// Check authentication
if (authService.isAuthenticatedSync()) { }

// Check roles
if (authService.hasRole('admin')) { }

// Logout
authService.logout();
```

### 2. Functional HTTP Interceptor (`auth.interceptor.ts`)

**Purpose**: Automatically attach JWT to HTTP requests

**Features**:
- Adds `Authorization: Bearer <token>` header
- Handles 401 errors with automatic token refresh
- Skips auth for login/register endpoints
- Automatic logout on refresh failure

**Configuration**:
```typescript
// app.config.ts
provideHttpClient(
  withInterceptors([authInterceptor])
)
```

### 3. Functional Guards (`auth.guard.ts`)

**Available Guards**:

#### `authGuard`
Protects routes requiring authentication
```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

#### `roleGuard(roles: string[], requireAll?: boolean)`
Protects routes requiring specific roles
```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, roleGuard(['admin'])]
}
```

#### `adminGuard`
Convenience guard for admin-only routes
```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, adminGuard]
}
```

#### `guestGuard`
Prevents authenticated users from accessing certain routes (e.g., login page)
```typescript
{
  path: 'login',
  component: LoginComponent,
  canActivate: [guestGuard]
}
```

#### `permissionGuard`
Reads required roles from route data
```typescript
{
  path: 'settings',
  component: SettingsComponent,
  canActivate: [permissionGuard],
  data: { roles: ['admin', 'moderator'] }
}
```

## ?? Quick Start

### 1. Backend Requirements

Your backend must provide these endpoints:

#### POST `/api/auth/login`
**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["user"]
  },
  "expiresIn": 3600
}
```

#### POST `/api/auth/refresh`
**Request**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response**: Same as login response

### 2. JWT Token Structure

Your JWT must include:
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "roles": ["user", "admin"],
  "exp": 1234567890,
  "iat": 1234567890
}
```

### 3. Using in Components

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-my-component',
  template: `
    @if (authService.isAuthenticated()) {
      <p>Welcome, {{ authService.currentUser()?.email }}</p>
      
      @if (authService.hasRole('admin')) {
        <button routerLink="/admin">Admin Panel</button>
      }
      
      <button (click)="logout()">Logout</button>
    }
  `
})
export class MyComponent {
  readonly authService = inject(AuthService);
  
  logout(): void {
    this.authService.logout();
  }
}
```

## ?? Security Best Practices

### ? Implemented
- JWT stored in sessionStorage (cleared on tab close)
- Token expiration validation
- Automatic token refresh
- HTTPS enforcement (configure in backend)
- Role-based access control

### ?? Production Recommendations

1. **Use HttpOnly Cookies** instead of sessionStorage:
   ```typescript
   // Backend should set HttpOnly cookie
   Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict
   ```

2. **Enable CORS** properly:
   ```typescript
   // Backend CORS config
   {
     origin: 'https://yourdomain.com',
     credentials: true
   }
   ```

3. **Implement CSRF protection** for cookie-based auth

4. **Use short token expiration** (15 minutes for access token)

5. **Add refresh token rotation**

6. **Enable Content Security Policy** headers

## ?? Testing

### Unit Tests Example

```typescript
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login successfully', () => {
    const mockResponse = {
      accessToken: 'test-token',
      user: { id: '1', email: 'test@test.com', roles: ['user'] }
    };

    service.login({ email: 'test@test.com', password: 'pass' })
      .subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(service.isAuthenticatedSync()).toBe(true);
      });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
```

### Guard Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  it('should allow authenticated users', () => {
    const authService = jasmine.createSpyObj('AuthService', ['isAuthenticatedSync']);
    authService.isAuthenticatedSync.and.returnValue(true);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    const result = authGuard({} as any, {} as any);
    expect(result).toBe(true);
  });
});
```

## ?? Customization

### Adding Custom Claims

Extend `TokenPayload` interface:
```typescript
// auth.models.ts
export interface TokenPayload {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];  // Add custom claims
  organizationId: string;
  exp: number;
  iat: number;
}
```

### Creating Custom Guards

```typescript
// Check specific permission
export const canEditPostGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const postId = route.params['id'];
  
  // Custom logic
  return authService.hasPermission('posts:edit', postId);
};
```

## ?? Troubleshooting

### Issue: "Cannot read property 'user' of undefined"
**Solution**: Ensure backend returns correct response format

### Issue: Infinite redirect loop
**Solution**: Check that guestGuard and authGuard aren't on the same route

### Issue: Token not attached to requests
**Solution**: Verify interceptor is registered in app.config.ts

### Issue: 401 errors after token refresh
**Solution**: Check refresh token endpoint returns new access token

## ?? Additional Resources

- [Angular Guards Documentation](https://angular.dev/guide/routing/route-guards)
- [HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## ?? License

This implementation is provided as-is for use in your Angular applications.
