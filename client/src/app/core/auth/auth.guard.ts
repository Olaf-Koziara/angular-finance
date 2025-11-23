import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

const LOGIN_ROUTE = '/login';
const UNAUTHORIZED_ROUTE = '/unauthorized';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([LOGIN_ROUTE], {
    queryParams: { returnUrl: state.url },
  });
};

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return redirectToLogin(router, state.url);
    }

    // Since we don't have roles in the User model yet, allow access for now
    // This can be extended when roles are added to the backend
    return true;
  };
};

function redirectToLogin(router: Router, returnUrl: string): UrlTree {
  return router.createUrlTree([LOGIN_ROUTE], {
    queryParams: { returnUrl },
  });
}
