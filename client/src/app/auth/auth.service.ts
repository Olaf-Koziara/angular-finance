import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { AuthResponse, LoginCredentials, User, TokenPayload } from './auth.models';

/**
 * AuthService - Centralized authentication service using functional inject() pattern
 * Manages JWT tokens, user state, and authentication flow
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  // State management with signals for better reactivity
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => !!this.currentUser());
  
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  constructor() {
    // Restore session on service initialization
    this.restoreSession();
  }

  /**
   * Login with email and password
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(response => this.setSession(response)),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout and clear session
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /**
   * Get current access token
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticatedSync(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.roles.includes(role) ?? false;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Check if user has all of the specified roles
   */
  hasAllRoles(roles: string[]): boolean {
    return roles.every(role => this.hasRole(role));
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>('/api/auth/refresh', { refreshToken }).pipe(
      tap(response => this.setSession(response)),
      catchError(error => {
        console.error('Token refresh failed:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Set authentication session
   */
  private setSession(authResult: AuthResponse): void {
    sessionStorage.setItem(this.TOKEN_KEY, authResult.accessToken);
    
    if (authResult.refreshToken) {
      sessionStorage.setItem(this.REFRESH_TOKEN_KEY, authResult.refreshToken);
    }
    
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    
    this.userSubject.next(authResult.user);
    this.currentUser.set(authResult.user);
  }

  /**
   * Clear authentication session
   */
  private clearSession(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    
    this.userSubject.next(null);
    this.currentUser.set(null);
  }

  /**
   * Restore session from storage
   */
  private restoreSession(): void {
    const token = this.getToken();
    const userData = sessionStorage.getItem(this.USER_KEY);
    
    if (token && userData && !this.isTokenExpired(token)) {
      try {
        const user = JSON.parse(userData) as User;
        this.userSubject.next(user);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Failed to restore session:', error);
        this.clearSession();
      }
    } else {
      this.clearSession();
    }
  }

  /**
   * Check if JWT token is expired
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  /**
   * Decode JWT token
   */
  private decodeToken(token: string): TokenPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded) as TokenPayload;
  }

  /**
   * Get user data from token
   */
  getUserFromToken(token: string): Partial<User> | null {
    try {
      const payload = this.decodeToken(token);
      return {
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };
    } catch (error) {
      return null;
    }
  }
}
