import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils.js';

/**
 * Authentication middleware that validates JWT tokens.
 *
 * Security features:
 * - Checks for Bearer token in Authorization header
 * - Also checks for access_token in cookies (for SSR scenarios)
 * - Validates token signature and expiry
 * - Attaches decoded user info to request for downstream handlers
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  let token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  // Fallback to cookie if no header token (useful for SSR)
  if (!token && req.cookies?.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  // Attach user info to request for use in route handlers
  (req as AuthenticatedRequest).user = {
    userId: decoded.userId,
    email: decoded.email,
    roles: decoded.roles,
  };

  next();
}

/**
 * Role-based authorization middleware factory.
 * Use after authenticateToken to restrict access to specific roles.
 *
 * @param allowedRoles - Array of roles that are allowed to access the route
 */
export function requireRoles(allowedRoles: string[]): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const hasRole = allowedRoles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }

    next();
  };
}

export interface AuthenticatedUser {
  userId: string;
  email: string;
  roles: string[];
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
