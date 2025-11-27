import { Injectable, inject } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

/**
 * Response from authentication endpoints.
 * Access token is provided in response body for client-side usage,
 * while refresh token is stored in HttpOnly cookie by the server.
 */
export interface AuthResponse {
  accessToken: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  id: string;
  email?: string;
  roles: string[];
  displayName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const ACCESS_TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Authentication service implementing secure JWT handling.
 *
 * Security features:
 * - Access tokens are short-lived (15 minutes) and stored in memory/sessionStorage
 * - Refresh tokens are stored in HttpOnly cookies (set by server, not accessible to JS)
 * - Automatic token refresh on 401 errors via interceptor
 * - Proper session cleanup on logout
 *
 * Note: This service uses HttpBackend directly to bypass the auth interceptor
 * for authentication endpoints, preventing infinite loops during token refresh.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly router = inject(Router);
  private readonly storage = getSessionStorage();

  private readonly userSubject = new BehaviorSubject<AuthenticatedUser | null>(
    restoreUserFromStorage(this.storage)
  );
  readonly user$ = this.userSubject.asObservable();

  // Flag to prevent multiple simultaneous refresh attempts
  private isRefreshing = false;

  /**
   * Authenticates user with credentials.
   * Server sets HttpOnly cookies for secure token storage.
   */
  login(credentials: LoginPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/login', credentials, { withCredentials: true })
      .pipe(
        tap((response) => this.setSession(response)),
        catchError((error) => {
          this.clearSession();
          return throwError(() => error);
        })
      );
  }

  /**
   * Refreshes the access token using the refresh token from HttpOnly cookie.
   * This is called automatically by the auth interceptor on 401 responses.
   */
  refreshToken(): Observable<AuthResponse> {
    if (this.isRefreshing) {
      return throwError(() => new Error('Token refresh already in progress'));
    }

    this.isRefreshing = true;

    return this.http
      .post<AuthResponse>('/api/auth/refresh', {}, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.setSession(response);
          this.isRefreshing = false;
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Logs out the user and clears all session data.
   * Also calls the server to clear HttpOnly cookies.
   */
  logout(redirectToLogin: boolean = true): void {
    // Call server to clear HttpOnly cookies
    this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        complete: () => {
          this.clearSession();
          if (redirectToLogin) {
            this.router.navigate(['/login']);
          }
        },
        error: () => {
          // Clear local session even if server call fails
          this.clearSession();
          if (redirectToLogin) {
            this.router.navigate(['/login']);
          }
        },
      });
  }

  /**
   * Returns the current access token for use in Authorization header.
   */
  getToken(): string | null {
    return this.storage?.getItem(ACCESS_TOKEN_KEY) ?? null;
  }

  getUserSnapshot(): AuthenticatedUser | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.userSubject.value;
  }

  hasRole(role: string): boolean {
    return this.userSubject.value?.roles.includes(role) ?? false;
  }

  private setSession(authResult: AuthResponse): void {
    if (!this.storage) {
      return;
    }

    // Store access token for use in Authorization header
    // Note: Refresh token is stored in HttpOnly cookie by the server
    this.storage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    this.storage.setItem(USER_KEY, JSON.stringify(authResult.user));
    this.userSubject.next(authResult.user);
  }

  private clearSession(): void {
    if (this.storage) {
      this.storage.removeItem(ACCESS_TOKEN_KEY);
      this.storage.removeItem(USER_KEY);
    }
    this.userSubject.next(null);
  }
}

function restoreUserFromStorage(storage: Storage | null): AuthenticatedUser | null {
  if (!storage) {
    return null;
  }

  const rawUser = storage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthenticatedUser;
  } catch {
    storage.removeItem(USER_KEY);
    return null;
  }
}

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
