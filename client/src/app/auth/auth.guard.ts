import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Functional Guard for route authentication
 * Redirects to login page if user is not authenticated
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedSync()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  
  return false;
};

/**
 * Factory function for role-based guards
 * Creates a guard that checks if user has required role(s)
 * 
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @param requireAll - If true, user must have ALL roles. If false, user needs ANY role (default: false)
 */
export const roleGuard = (allowedRoles: string[], requireAll = false): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // First check if user is authenticated
    if (!authService.isAuthenticatedSync()) {
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Check role requirements
    const hasRequiredRoles = requireAll
      ? authService.hasAllRoles(allowedRoles)
      : authService.hasAnyRole(allowedRoles);

    if (hasRequiredRoles) {
      return true;
    }

    // User doesn't have required role(s)
    console.warn(`Access denied. Required roles: ${allowedRoles.join(', ')}`);
    router.navigate(['/unauthorized']);
    return false;
  };
};

/**
 * Guard that checks for admin role
 * Convenience guard for common use case
 */
export const adminGuard: CanActivateFn = roleGuard(['admin']);

/**
 * Guard that checks for multiple roles (user must have at least one)
 * Example: moderatorGuard checks for 'admin' OR 'moderator' role
 */
export const moderatorGuard: CanActivateFn = roleGuard(['admin', 'moderator']);

/**
 * Guard that prevents authenticated users from accessing certain routes
 * Useful for login/register pages
 */
export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticatedSync()) {
    return true;
  }

  // User is authenticated, redirect to dashboard
  router.navigate(['/dashboard']);
  return false;
};

/**
 * Guard that checks specific permission from route data
 * Reads required roles from route.data['roles']
 */
export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // First check if user is authenticated
  if (!authService.isAuthenticatedSync()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  // Get required roles from route data
  const requiredRoles = route.data['roles'] as string[] | undefined;
  
  if (!requiredRoles || requiredRoles.length === 0) {
    // No specific roles required, allow access
    return true;
  }

  // Check if user has any of the required roles
  const hasAccess = authService.hasAnyRole(requiredRoles);
  
  if (hasAccess) {
    return true;
  }

  console.warn(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
  router.navigate(['/unauthorized']);
  return false;
};
