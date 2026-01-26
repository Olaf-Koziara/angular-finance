import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

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

    if (allowedRoles.some((role) => authService.hasRole(role))) {
      return true;
    }

    return router.createUrlTree([UNAUTHORIZED_ROUTE]);
  };
};

function redirectToLogin(router: Router, returnUrl: string): UrlTree {
  return router.createUrlTree([LOGIN_ROUTE], {
    queryParams: { returnUrl },
  });
}
