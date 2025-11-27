import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

// Track if a refresh is in progress to avoid multiple refresh calls
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

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
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.accessToken);
        
        // Retry the original request with the new token
        return next(addTokenToRequest(request, response.accessToken));
      }),
      catchError((refreshError) => {
        isRefreshing = false;
        refreshTokenSubject.next(null);
        
        // Refresh failed - logout and redirect to login
        authService.logout();
        return throwError(() => refreshError);
      })
    );
  } else {
    // Wait for the refresh to complete and then retry with the new token
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token) => next(addTokenToRequest(request, token)))
    );
  }
}
