import { Router, Request, Response } from 'express';
import { jwtConfig, ACCESS_TOKEN_EXPIRY_MS, REFRESH_TOKEN_EXPIRY_MS } from '../config/jwt.config.js';
import {
  generateTokenPair,
  verifyRefreshToken,
  TokenPayload,
} from '../utils/jwt.utils.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Mock user database for demo purposes.
 * 
 * IMPORTANT: In production:
 * - Use a real database (PostgreSQL, MongoDB, etc.)
 * - Hash passwords using bcrypt or Argon2
 * - Never use hardcoded credentials
 * 
 * Example with bcrypt:
 * const hashedPassword = await bcrypt.hash(password, 12);
 * const isValid = await bcrypt.compare(inputPassword, hashedPassword);
 */
const MOCK_USERS: Record<string, { password: string; user: TokenPayload & { displayName: string } }> = {
  'admin@example.com': {
    password: 'admin123', // TODO: In production, store hashed password
    user: {
      userId: '1',
      email: 'admin@example.com',
      roles: ['admin', 'user'],
      displayName: 'Admin User',
    },
  },
  'user@example.com': {
    password: 'user123', // TODO: In production, store hashed password
    user: {
      userId: '2',
      email: 'user@example.com',
      roles: ['user'],
      displayName: 'Regular User',
    },
  },
};

/**
 * POST /api/auth/login
 *
 * Authenticates user credentials and returns tokens.
 * - Access token in response body (for SPA usage)
 * - Refresh token in HttpOnly cookie (secure storage)
 */
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  const userData = MOCK_USERS[email];
  if (!userData || userData.password !== password) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const tokenPayload: TokenPayload = {
    userId: userData.user.userId,
    email: userData.user.email,
    roles: userData.user.roles,
  };

  const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

  // Set refresh token in HttpOnly cookie for security
  res.cookie('refresh_token', refreshToken, {
    ...jwtConfig.cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY_MS,
  });

  // Also set access token in HttpOnly cookie for SSR compatibility
  res.cookie('access_token', accessToken, {
    ...jwtConfig.cookieOptions,
    maxAge: ACCESS_TOKEN_EXPIRY_MS,
  });

  res.json({
    accessToken,
    user: {
      id: userData.user.userId,
      email: userData.user.email,
      roles: userData.user.roles,
      displayName: userData.user.displayName,
    },
  });
});

/**
 * POST /api/auth/refresh
 *
 * Rotates tokens using the refresh token from HttpOnly cookie.
 * - Validates existing refresh token
 * - Generates new token pair
 * - Updates cookies
 */
router.post('/refresh', (req: Request, res: Response): void => {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token required' });
    return;
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    // Clear invalid cookies
    res.clearCookie('refresh_token', jwtConfig.cookieOptions);
    res.clearCookie('access_token', jwtConfig.cookieOptions);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
    return;
  }

  const tokenPayload: TokenPayload = {
    userId: decoded.userId,
    email: decoded.email,
    roles: decoded.roles,
  };

  const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(tokenPayload);

  // Update cookies with new tokens (token rotation)
  res.cookie('refresh_token', newRefreshToken, {
    ...jwtConfig.cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY_MS,
  });

  res.cookie('access_token', accessToken, {
    ...jwtConfig.cookieOptions,
    maxAge: ACCESS_TOKEN_EXPIRY_MS,
  });

  // Get user data for response
  const userData = MOCK_USERS[decoded.email];

  res.json({
    accessToken,
    user: userData
      ? {
          id: userData.user.userId,
          email: userData.user.email,
          roles: userData.user.roles,
          displayName: userData.user.displayName,
        }
      : {
          id: decoded.userId,
          email: decoded.email,
          roles: decoded.roles,
        },
  });
});

/**
 * POST /api/auth/logout
 *
 * Clears authentication cookies.
 * In production, you might also want to:
 * - Invalidate the refresh token in a token blacklist
 * - Clear any server-side session data
 */
router.post('/logout', (req: Request, res: Response): void => {
  res.clearCookie('refresh_token', jwtConfig.cookieOptions);
  res.clearCookie('access_token', jwtConfig.cookieOptions);
  res.json({ message: 'Logged out successfully' });
});

/**
 * GET /api/auth/me
 *
 * Returns the current authenticated user's information.
 * Protected by authentication middleware.
 */
router.get('/me', authenticateToken, (req: Request, res: Response): void => {
  const user = (req as AuthenticatedRequest).user;
  const userData = MOCK_USERS[user.email];

  res.json({
    user: userData
      ? {
          id: userData.user.userId,
          email: userData.user.email,
          roles: userData.user.roles,
          displayName: userData.user.displayName,
        }
      : {
          id: user.userId,
          email: user.email,
          roles: user.roles,
        },
  });
});

export default router;
