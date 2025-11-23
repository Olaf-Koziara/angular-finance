import { Injectable, inject, signal } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User,
  ApiResponse 
} from '../models/auth.model';

const ACCESS_TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly router = inject(Router);
  private readonly storage = getSessionStorage();
  private readonly apiUrl = environment.apiUrl;

  readonly user = signal<User | null>(restoreUserFromStorage(this.storage));
  readonly isAuthenticated = signal<boolean>(!!this.getToken());

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, credentials).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Login failed');
        }
        return response.data;
      }),
      tap((authData) => this.setSession(authData)),
      catchError((error) => {
        this.clearSession();
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/register`, data).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Registration failed');
        }
        return response.data;
      }),
      tap((authData) => this.setSession(authData)),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/profile`).pipe(
      map((response) => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Failed to fetch profile');
        }
        return response.data;
      }),
      tap((userData) => {
        this.user.set(userData);
        if (this.storage) {
          this.storage.setItem(USER_KEY, JSON.stringify(userData));
        }
      }),
      catchError((error) => {
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

  getUserSnapshot(): User | null {
    return this.user();
  }

  private setSession(authResult: AuthResponse): void {
    if (!this.storage) {
      return;
    }

    this.storage.setItem(ACCESS_TOKEN_KEY, authResult.token);
    this.storage.setItem(USER_KEY, JSON.stringify(authResult.user));
    this.user.set(authResult.user);
    this.isAuthenticated.set(true);
  }

  private clearSession(): void {
    if (!this.storage) {
      return;
    }

    this.storage.removeItem(ACCESS_TOKEN_KEY);
    this.storage.removeItem(USER_KEY);
    this.user.set(null);
    this.isAuthenticated.set(false);
  }
}

function restoreUserFromStorage(storage: Storage | null): User | null {
  if (!storage) {
    return null;
  }

  const rawUser = storage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
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
