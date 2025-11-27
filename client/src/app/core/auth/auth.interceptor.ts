import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

/**
 * URLs that should not trigger token refresh on 401
 * (to prevent infinite loops)
 */
const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/refresh', '/api/auth/logout'];

/**
 * Module-level state for token refresh coordination.
 * 
 * Note: These are intentionally module-scoped to ensure a single refresh
 * attempt across all interceptor invocations in the application.
 * The BehaviorSubject acts as a queue - pending requests wait for the 
 * refresh to complete and then retry with the new token.
 */
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

/**
 * Authentication interceptor implementing secure JWT handling.
 *
 * Features:
 * - Attaches Authorization header with Bearer token to all API requests
 * - Sends credentials (cookies) with requests for HttpOnly cookie support
 * - Handles 401 errors by attempting token refresh
 * - Queues failed requests while token is being refreshed
 * - Redirects to login on authentication failure
 * - Redirects to unauthorized page on 403 errors
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip auth handling for non-API requests
  if (!request.url.startsWith('/api')) {
    return next(request);
  }

  // Add authorization header and credentials
  const authRequest = addTokenToRequest(request, authService.getToken());

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Don't try to refresh for auth endpoints
      if (isAuthEndpoint(request.url)) {
        return throwError(() => error);
      }

      if (error.status === 401) {
        return handleUnauthorizedError(request, next, authService, router);
      }

      if (error.status === 403) {
        // User is authenticated but not authorized for this resource
        router.navigate(['/unauthorized']);
        return throwError(() => error);
      }

      return throwError(() => error);
    })
  );
};

/**
 * Adds the access token and credentials to the request.
 */
function addTokenToRequest(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  const headers = token
    ? request.headers.set('Authorization', `Bearer ${token}`)
    : request.headers;

  return request.clone({
    headers,
    withCredentials: true, // Send cookies with request
  });
}

/**
 * Checks if the URL is an authentication endpoint.
 */
function isAuthEndpoint(url: string): boolean {
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

/**
 * Handles 401 Unauthorized errors by attempting token refresh.
 * Uses module-level state to coordinate between concurrent requests:
 * - First request to fail starts the refresh
 * - Subsequent requests wait for the refresh to complete
 * - All requests retry with the new token once refresh succeeds
 */
function handleUnauthorizedError(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.accessToken);

        // Retry the original request with the new token
        const retryRequest = addTokenToRequest(request, response.accessToken);
        return next(retryRequest);
      }),
      catchError((refreshError) => {
        isRefreshing = false;
        refreshTokenSubject.next(null);

        // Refresh failed - redirect to login
        authService.logout(false);
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url },
        });

        return throwError(() => refreshError);
      })
    );
  }

  // Wait for the ongoing refresh to complete
  return refreshTokenSubject.pipe(
    filter((token) => token !== null),
    take(1),
    switchMap((token) => {
      const retryRequest = addTokenToRequest(request, token);
      return next(retryRequest);
    })
  );
}
