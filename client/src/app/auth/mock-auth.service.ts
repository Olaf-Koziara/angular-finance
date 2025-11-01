import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { AuthResponse, LoginCredentials, User } from './auth.models';

/**
 * Mock authentication service for development and testing
 * Replace with real backend integration in production
 */
@Injectable({ providedIn: 'root' })
export class MockAuthService {
  
  private readonly mockUsers = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      user: {
        id: '1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        roles: ['admin', 'user']
      }
    },
    {
      email: 'user@example.com',
      password: 'user123',
      user: {
        id: '2',
        email: 'user@example.com',
        firstName: 'Regular',
        lastName: 'User',
        roles: ['user']
      }
    }
  ];

  /**
   * Mock login endpoint
   * Simulates server delay and returns JWT-like response
   */
  mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    const user = this.mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      return throwError(() => ({
        error: { message: 'Invalid email or password' },
        status: 401
      })).pipe(delay(500));
    }

    const accessToken = this.generateMockToken(user.user);
    const refreshToken = this.generateMockRefreshToken(user.user);

    return of({
      accessToken,
      refreshToken,
      user: user.user,
      expiresIn: 3600
    }).pipe(delay(1000)); // Simulate network delay
  }

  /**
   * Mock refresh endpoint
   */
  mockRefresh(): Observable<AuthResponse> {
    // Simulate token refresh
    const user = this.mockUsers[0].user;
    
    return of({
      accessToken: this.generateMockToken(user),
      refreshToken: this.generateMockRefreshToken(user),
      user: user,
      expiresIn: 3600
    }).pipe(delay(500));
  }

  /**
   * Generate mock JWT token
   * NOTE: This is NOT a real JWT, just a base64 encoded payload
   * In production, your backend generates real signed JWTs
   */
  private generateMockToken(user: User): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      iat: Math.floor(Date.now() / 1000)
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'mock-signature';

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Generate mock refresh token
   */
  private generateMockRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
    };

    const encodedPayload = btoa(JSON.stringify(payload));
    return `refresh.${encodedPayload}.mock-signature`;
  }
}

/**
 * HTTP Interceptor to handle mock API requests
 * Use this during development when backend is not available
 */
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const mockAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const mockService = inject(MockAuthService);

  // Intercept login requests
  if (req.url.includes('/api/auth/login') && req.method === 'POST') {
    const credentials = req.body as LoginCredentials;
    return mockService.mockLogin(credentials).pipe(
      delay(1000),
      map(response => new HttpResponse({
        status: 200,
        body: response
      }))
    );
  }

  // Intercept refresh requests
  if (req.url.includes('/api/auth/refresh') && req.method === 'POST') {
    return mockService.mockRefresh().pipe(
      delay(500),
      map(response => new HttpResponse({
        status: 200,
        body: response
      }))
    );
  }

  // Pass through other requests
  return next(req);
};

/**
 * To use mock authentication in development:
 * 
 * 1. Add mock interceptor to app.config.ts:
 * 
 * import { mockAuthInterceptor } from './auth/mock-auth.service';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([mockAuthInterceptor, authInterceptor])
 *     ),
 *   ]
 * };
 * 
 * 2. Use demo credentials:
 *    - Admin: admin@example.com / admin123
 *    - User: user@example.com / user123
 */
