import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable, ReplaySubject, first, timeout, TimeoutError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * State machine for handling concurrent 401 errors during token refresh.
 * 
 * States:
 * - idle: No refresh in progress
 * - refreshing: A refresh request is in progress
 * 
 * The refreshResultSubject emits the result of the refresh operation:
 * - { success: true, token: string } when refresh succeeds
 * - { success: false, error: Error } when refresh fails
 * 
 * Using ReplaySubject(1) ensures:
 * 1. Late subscribers still receive the last emitted result
 * 2. Only one refresh request is made at a time
 * 3. Waiting requests properly handle both success and failure
 * 4. Subject is reset after each cycle to prevent memory leaks
 * 
 * A 30-second timeout prevents requests from hanging indefinitely.
 */
type RefreshResult = { success: true; token: string } | { success: false; error: Error };

const REFRESH_TIMEOUT_MS = 30000;
let isRefreshing = false;
let refreshResultSubject = new ReplaySubject<RefreshResult>(1);

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Skip auth header for auth endpoints (they use HttpBackend directly or handle their own auth)
  if (isAuthEndpoint(request.url)) {
    return next(request);
  }

  const token = authService.getToken();
  const authRequest = token ? addTokenToRequest(request, token) : request;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint(request.url)) {
        return handleUnauthorizedError(request, next, authService, router);
      }

      if (error.status === 403) {
        // Forbidden - redirect to unauthorized page
        router.navigate(['/unauthorized']);
        return throwError(() => error);
      }

      return throwError(() => error);
    })
  );
};

function addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Include cookies for refresh token
  });
}

function isAuthEndpoint(url: string): boolean {
  const authEndpoints = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh', '/api/auth/logout'];
  return authEndpoints.some(endpoint => url.includes(endpoint));
}

function handleUnauthorizedError(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    // Create a fresh ReplaySubject for this refresh cycle
    refreshResultSubject = new ReplaySubject<RefreshResult>(1);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        // Notify waiting requests of success
        refreshResultSubject.next({ success: true, token: response.accessToken });
        refreshResultSubject.complete();
        
        // Retry the original request with the new token
        return next(addTokenToRequest(request, response.accessToken));
      }),
      catchError((refreshError) => {
        isRefreshing = false;
        // Notify waiting requests of failure
        refreshResultSubject.next({ success: false, error: refreshError });
        refreshResultSubject.complete();
        
        // Refresh failed - logout and redirect to login
        authService.logout();
        return throwError(() => refreshError);
      })
    );
  } else {
    // Wait for the refresh to complete with timeout protection
    return refreshResultSubject.pipe(
      first(),
      timeout(REFRESH_TIMEOUT_MS),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          // Refresh took too long, treat as failure
          return throwError(() => new Error('Token refresh timeout'));
        }
        return throwError(() => error);
      }),
      switchMap((result) => {
        if (result.success) {
          // Retry with the new token
          return next(addTokenToRequest(request, result.token));
        } else {
          // Refresh failed, propagate the error
          return throwError(() => result.error);
        }
      })
    );
  }
}
