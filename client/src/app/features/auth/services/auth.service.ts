import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AuthResponse {
  accessToken: string;
  user: AuthenticatedUser;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface AuthenticatedUser {
  id: string;
  email?: string;
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

const ACCESS_TOKEN_KEY = 'auth_access_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Use HttpBackend to bypass interceptors for auth requests
  private readonly http = new HttpClient(inject(HttpBackend));
  
  private readonly router = inject(Router);
  private readonly storage = getSessionStorage();

  private readonly userSubject = new BehaviorSubject<AuthenticatedUser | null>(
    restoreUserFromStorage(this.storage)
  );
  readonly user$ = this.userSubject.asObservable();

  // Flag to track if a refresh is in progress
  private refreshInProgress = false;
  private refreshSubject = new BehaviorSubject<boolean>(false);

  login(credentials: LoginPayload): Observable<AuthResponse> {
    return this.http.post<{ data: AuthResponse }>(`${environment.API_ORIGIN}/api/auth/login`, credentials, {
      withCredentials: true,
    }).pipe(
      tap((response) => this.setSession(response.data)),
      map((response) => response.data),
      catchError((error) => {
        this.clearSession();
        return throwError(() => error);
      })
    );
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<{ data: AuthResponse }>(`${environment.API_ORIGIN}/api/auth/register`, payload, {
        withCredentials: true, // Include cookies for refresh token
      })
      .pipe(
        tap((response) => this.setSession(response.data)),
        map((response) => response.data),
        catchError((error) => throwError(() => error))
      );
  }

  refreshToken(): Observable<RefreshResponse> {
    if (this.refreshInProgress) {
      // Return observable that waits for the refresh to complete
      return new Observable(subscriber => {
        const subscription = this.refreshSubject.subscribe(completed => {
          if (completed) {
            const token = this.getToken();
            if (token) {
              subscriber.next({ accessToken: token });
              subscriber.complete();
            } else {
              subscriber.error(new Error('Token refresh failed'));
            }
            subscription.unsubscribe();
          }
        });
      });
    }

    this.refreshInProgress = true;
    this.refreshSubject.next(false);

    return this.http.post<{ data: RefreshResponse }>(`${environment.API_ORIGIN}/api/auth/refresh`, {}, {
      withCredentials: true,
    }).pipe(
      tap((response) => {
        if (this.storage && response.data.accessToken) {
          this.storage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        }
        this.refreshInProgress = false;
        this.refreshSubject.next(true);
      }),
      map((response) => response.data),
      catchError((error) => {
        this.refreshInProgress = false;
        this.refreshSubject.next(true);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(redirectToLogin: boolean = true): void {
    // Call logout endpoint to clear refresh token cookie
    this.http.post(`${environment.API_ORIGIN}/api/auth/logout`, {}, {
      withCredentials: true,
    }).subscribe({
      complete: () => {
        this.clearSession();
        if (redirectToLogin) {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        // Clear session even on error
        this.clearSession();
        if (redirectToLogin) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  getToken(): string | null {
    return this.storage?.getItem(ACCESS_TOKEN_KEY) ?? null;
  }

  getUserSnapshot(): AuthenticatedUser | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    // For now, role checking is not implemented on the backend
    // This can be extended when roles are added to the user model
    return false;
  }

  private setSession(authResult: AuthResponse): void {
    if (!this.storage) {
      return;
    }

    this.storage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    this.storage.setItem(USER_KEY, JSON.stringify(authResult.user));
    this.userSubject.next(authResult.user);
  }

  private clearSession(): void {
    if (!this.storage) {
      return;
    }

    this.storage.removeItem(ACCESS_TOKEN_KEY);
    this.storage.removeItem(USER_KEY);
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
  } catch (error) {
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
  } catch (error) {
    return null;
  }
}
