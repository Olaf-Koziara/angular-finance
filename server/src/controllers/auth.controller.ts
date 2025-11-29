import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { AuthRequest } from '../types';
import { NotFoundError, AuthenticationError } from '../utils/errors';
import { config } from '../config';

const REFRESH_TOKEN_COOKIE = 'refresh_token';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Set refresh token as HttpOnly cookie with secure settings.
 * 
 * Security considerations:
 * - httpOnly: Prevents JavaScript access (XSS protection)
 * - secure: Only sent over HTTPS in production
 * - sameSite: 'strict' prevents CSRF attacks by not sending cookie on cross-origin requests
 * - path: '/api/auth' limits cookie scope to auth endpoints only
 */
const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: '/api/auth',
  });
};

/**
 * Clear refresh token cookie
 */
const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: 'strict',
    path: '/api/auth',
  });
};

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: RegisterInput = req.body;
      const result = await authService.register(data);

      // Set refresh token as HttpOnly cookie
      setRefreshTokenCookie(res, result.refreshToken);

      // Return access token in response body (not the refresh token)
      sendSuccess(res, { user: result.user, accessToken: result.accessToken }, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: LoginInput = req.body;
      const result = await authService.login(data);

      // Set refresh token as HttpOnly cookie
      setRefreshTokenCookie(res, result.refreshToken);

      // Return access token in response body (not the refresh token)
      sendSuccess(res, { user: result.user, accessToken: result.accessToken }, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

      if (!refreshToken) {
        throw new AuthenticationError('Refresh token not provided');
      }

      const tokens = await authService.refreshAccessToken(refreshToken);

      // Set new refresh token as HttpOnly cookie (token rotation)
      setRefreshTokenCookie(res, tokens.refreshToken);

      // Return new access token in response body
      sendSuccess(res, { accessToken: tokens.accessToken }, 'Token refreshed successfully');
    } catch (error) {
      // Clear the invalid cookie
      clearRefreshTokenCookie(res);
      next(error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

      if (refreshToken) {
        await authService.logout(refreshToken);
      }

      // Always clear the cookie
      clearRefreshTokenCookie(res);

      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      // Clear cookie even on error
      clearRefreshTokenCookie(res);
      next(error);
    }
  }

  async logoutAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AuthenticationError('User not authenticated');
      }

      await authService.logoutAll(userId);

      // Clear the cookie
      clearRefreshTokenCookie(res);

      sendSuccess(res, null, 'All sessions logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new NotFoundError('User not found');
      }

      const user = await authService.getUserById(userId);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      sendSuccess(res, user, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
