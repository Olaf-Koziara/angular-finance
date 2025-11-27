import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
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

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

const ACCESS_TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = new HttpClient(inject(HttpBackend));
  
  private readonly router = inject(Router);
  private readonly storage = getSessionStorage();

  private readonly userSubject = new BehaviorSubject<AuthenticatedUser | null>(
    restoreUserFromStorage(this.storage)
  );
  readonly user$ = this.userSubject.asObservable();

  login(credentials: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_ORIGIN}/api/auth/login`, credentials).pipe(
      tap((response) => this.setSession(response)),
      catchError((error) => {
        this.clearSession();
        return throwError(() => error);
      })
    );
  }

  register(payload: RegisterPayload): Observable<void> {
    return this.http
      .post<void>(`${environment.API_ORIGIN}/api/auth/register`, payload)
      .pipe(catchError((error) => throwError(() => error)));
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_ORIGIN}/api/auth/refresh`, {}).pipe(
      tap((response) => this.setSession(response)),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(redirectToLogin: boolean = true): void {
    this.clearSession();
    if (redirectToLogin) {
      this.router.navigate(['/login']);
    }
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
    return this.userSubject.value?.roles.includes(role) ?? false;
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
