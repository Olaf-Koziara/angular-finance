import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError, switchMap } from 'rxjs';

/**
 * Functional HTTP Interceptor for JWT authentication
 * Automatically attaches JWT token to outgoing requests and handles 401 errors
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Skip auth header for login and refresh endpoints
  const skipAuth = req.url.includes('/auth/login') || 
                   req.url.includes('/auth/register') ||
                   req.url.includes('/auth/refresh');
  
  if (skipAuth) {
    return next(req);
  }

  // Get token and clone request with Authorization header
  const token = authService.getToken();
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // Handle request and catch 401 errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid - attempt refresh
        return handleUnauthorizedError(authService, req, next);
      }
      
      if (error.status === 403) {
        console.error('Access forbidden:', error);
      }
      
      return throwError(() => error);
    })
  );
};

/**
 * Handle 401 Unauthorized errors by attempting token refresh
 */
function handleUnauthorizedError(
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const refreshToken = authService.getRefreshToken();
  
  if (!refreshToken) {
    // No refresh token available, logout
    authService.logout();
    return throwError(() => new Error('Authentication required'));
  }

  // Attempt to refresh token
  return authService.refreshToken().pipe(
    switchMap(() => {
      // Retry original request with new token
      const token = authService.getToken();
      const retryReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        : req;
      
      return next(retryReq);
    }),
    catchError(error => {
      // Refresh failed, logout user
      authService.logout();
      return throwError(() => error);
    })
  );
}

/**
 * Optional: Logging interceptor for debugging
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  
  console.log(`[HTTP] ${req.method} ${req.url}`);
  
  return next(req).pipe(
    catchError(error => {
      const duration = Date.now() - startTime;
      console.error(`[HTTP] ${req.method} ${req.url} failed after ${duration}ms`, error);
      return throwError(() => error);
    })
  );
};
