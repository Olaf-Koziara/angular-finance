# ?? Przewodnik Implementacji JWT z Functional Guards

## ? Co zosta?o zaimplementowane

### 1. Struktura Plik?w

```
src/app/
??? auth/
?   ??? auth.models.ts              ? Interfejsy TypeScript
?   ??? auth.service.ts             ? Serwis autoryzacji z inject()
?   ??? auth.interceptor.ts         ? Functional HTTP interceptor
?   ??? auth.guard.ts               ? Functional guards
?   ??? login.component.ts          ? Komponent logowania
?   ??? mock-auth.service.ts        ? Mock backend dla developmentu
??? features/
?   ??? dashboard/
?   ?   ??? dashboard.component.ts  ? Chroniony dashboard
?   ??? admin/
?   ?   ??? admin.component.ts      ? Panel admina (rola: admin)
?   ??? unauthorized/
?       ??? unauthorized.component.ts ? Strona "brak dost?pu"
??? app.config.ts                   ? Konfiguracja z interceptorem
??? app.routes.ts                   ? Routing z guards
```

## ?? Kluczowe Cechy

### ? Functional Patterns (Angular 20)
- ? `CanActivateFn` zamiast class-based guards
- ? `HttpInterceptorFn` zamiast class-based interceptors
- ? `inject()` function dla dependency injection
- ? Signals dla reaktywnego state managementu

### ?? Bezpiecze?stwo
- ? JWT token w sessionStorage
- ? Automatyczna walidacja expiracji tokenu
- ? Token refresh mechanism
- ? Automatyczne wylogowanie przy 401
- ? Role-based access control (RBAC)

### ?? UI/UX
- ? Nowoczesny gradient design
- ? Responsywno?? (mobile-first)
- ? Loading states
- ? Error handling z komunikatami
- ? Smooth transitions

## ?? Jak U?ywa?

### 1. Mock Backend (Development)

Aby u?ywa? mock backendu podczas developmentu:

**Opcja A: Dodaj mock interceptor do `app.config.ts`:**

```typescript
import { mockAuthInterceptor } from './auth/mock-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([mockAuthInterceptor, authInterceptor])
    ),
  ]
};
```

**Dane testowe:**
- **Admin**: email: `admin@example.com`, has?o: `admin123`
- **User**: email: `user@example.com`, has?o: `user123`

### 2. Prawdziwy Backend (Production)

Tw?j backend musi implementowa?:

#### POST `/api/auth/login`
```typescript
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": ["user", "admin"]
  },
  "expiresIn": 3600
}
```

#### POST `/api/auth/refresh`
```typescript
Request:
{
  "refreshToken": "eyJhbGci..."
}

Response: // taki sam jak login
```

### 3. Struktura JWT Token

Tw?j backend musi generowa? JWT z payload:

```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "roles": ["user", "admin"],
  "exp": 1234567890,
  "iat": 1234567890
}
```

## ?? Przyk?ady U?ycia

### Ochrona Route'?w

```typescript
// app.routes.ts
import { authGuard, roleGuard, adminGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Publiczne
  { path: 'login', component: LoginComponent },
  
  // Wymaga autentykacji
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  
  // Wymaga roli admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard]
  },
  
  // Wymaga jednej z r?l
  {
    path: 'moderator',
    component: ModeratorComponent,
    canActivate: [authGuard, roleGuard(['admin', 'moderator'])]
  },
  
  // Czytanie r?l z route.data
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [permissionGuard],
    data: { roles: ['admin'] }
  }
];
```

### U?ywanie w Komponentach

```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-my-component',
  template: `
    <!-- Warunkowe renderowanie -->
    @if (authService.isAuthenticated()) {
      <p>Witaj, {{ authService.currentUser()?.email }}</p>
      
      <!-- Sprawdzanie r?l -->
      @if (authService.hasRole('admin')) {
        <button routerLink="/admin">Panel Admina</button>
      }
      
      <button (click)="logout()">Wyloguj</button>
    } @else {
      <button routerLink="/login">Zaloguj si?</button>
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

### Logowanie U?ytkownika

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-login',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email" placeholder="Email">
      <input formControlName="password" type="password" placeholder="Has?o">
      <button type="submit" [disabled]="form.invalid">Zaloguj</button>
    </form>
  `
})
export class CustomLoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Login failed', err)
      });
    }
  }
}
```

### Sprawdzanie Wielu R?l

```typescript
// U?ytkownik musi mie? WSZYSTKIE role
const requireAllRoles = roleGuard(['admin', 'superuser'], true);

// U?ytkownik musi mie? PRZYNAJMNIEJ JEDN? rol?
const requireAnyRole = roleGuard(['admin', 'moderator'], false); // default
```

### Custom Guards

```typescript
// auth/custom.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const subscriptionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = authService.currentUser();
  
  if (user?.subscription === 'premium') {
    return true;
  }
  
  router.navigate(['/upgrade']);
  return false;
};
```

## ?? Konfiguracja dla Produkcji

### 1. Environment Variables

Utw?rz `environment.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  useMockAuth: false
};
```

### 2. HTTPS Only

W `auth.service.ts`, zmie? storage na cookies:

```typescript
// Zamiast sessionStorage, u?yj HttpOnly cookies
// Backend ustawia:
Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict
```

### 3. CORS Configuration

Backend musi pozwala? na credentials:

```typescript
// Express.js przyk?ad
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## ?? Testowanie

### Uruchomienie z Mock Backend

1. Dodaj `mockAuthInterceptor` do `app.config.ts`
2. Uruchom `ng serve`
3. Przejd? do `/login`
4. U?yj credentials: `admin@example.com` / `admin123`

### Route Guards Flow

```
User accesses /admin
    ?
authGuard checks authentication
    ?
adminGuard checks role
    ?
? Access granted (if admin)
? Redirect to /unauthorized (if not admin)
? Redirect to /login (if not authenticated)
```

## ?? Architektura Diagramy

### Authentication Flow

```
Login Component
    ? (email, password)
AuthService.login()
    ? HTTP POST /api/auth/login
Backend validates credentials
    ? Returns JWT + user data
AuthService stores token + user
    ? Updates signals
Router navigates to dashboard
    ?
Guards allow access
```

### HTTP Interceptor Flow

```
Component makes HTTP request
    ?
authInterceptor intercepts
    ?
Adds Authorization: Bearer <token>
    ?
Sends to backend
    ?
Response 401?
    ? YES
Attempt token refresh
    ? SUCCESS: Retry request
    ? FAIL: Logout user
    ? NO
Return response to component
```

## ?? Best Practices

### ? DO
- U?ywaj `inject()` w functional guards i interceptors
- Przechowuj wra?liwe dane w HttpOnly cookies (produkcja)
- Waliduj tokeny po stronie backendu
- U?ywaj kr?tkich expirations dla access tokens (15 min)
- Implementuj refresh token rotation
- Loguj wszystkie pr?by dost?pu (audit log)

### ? DON'T
- Nie przechowuj token?w w localStorage (XSS vulnerability)
- Nie u?ywaj class-based guards (deprecated w Angular 20)
- Nie hardcoduj r?l w komponentach
- Nie ufaj tokenowi po stronie frontowej
- Nie wysy?aj token?w przez niezabezpieczone po??czenia

## ?? Troubleshooting

### Problem: "Cannot read property 'user' of undefined"
**Rozwi?zanie**: Sprawd? format odpowiedzi z backendu

### Problem: Niesko?czona p?tla przekierowa?
**Rozwi?zanie**: Upewnij si?, ?e `guestGuard` i `authGuard` nie s? na tym samym route

### Problem: Token nie jest do??czany do request?w
**Rozwi?zanie**: Sprawd? czy `authInterceptor` jest zarejestrowany w `app.config.ts`

### Problem: 401 po token refresh
**Rozwi?zanie**: Sprawd? endpoint `/api/auth/refresh` zwraca nowy access token

## ?? Nast?pne Kroki

1. ? **Zaimplementowane** - podstawowa autentykacja i autoryzacja
2. ?? **Do zrobienia** - integracja z prawdziwym backendem
3. ?? **Do zrobienia** - testy jednostkowe i E2E
4. ?? **Do zrobienia** - audit logging
5. ?? **Do zrobienia** - 2FA (opcjonalnie)
6. ?? **Do zrobienia** - social login (OAuth) (opcjonalnie)

## ?? Gratulacje!

Masz teraz w pe?ni funkcjonaln? implementacj? JWT authentication z:
- ? Functional guards
- ? Functional interceptors
- ? Role-based access control
- ? Token refresh mechanism
- ? Modern Angular 20 patterns
- ? Zero external dependencies (opr?cz Angular)

---

**Autor**: Wygenerowane przez Cursor AI  
**Data**: 2025-11-01  
**Angular Version**: 20  
**Licencja**: MIT
