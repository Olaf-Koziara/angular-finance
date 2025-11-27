import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

// Rate limiting for auth endpoints to prevent brute force attacks
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  authController.register.bind(authController)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  loginRateLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token from HttpOnly cookie
 * @access  Public (requires valid refresh token cookie)
 */
router.post(
  '/refresh',
  authRateLimiter,
  authController.refresh.bind(authController)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (revoke refresh token and clear cookie)
 * @access  Public
 */
router.post(
  '/logout',
  authController.logout.bind(authController)
);

/**
 * @route   POST /api/auth/logout-all
 * @desc    Logout from all sessions (revoke all refresh tokens)
 * @access  Private
 */
router.post(
  '/logout-all',
  authRateLimiter,
  authenticate,
  authController.logoutAll.bind(authController)
);

// General rate limiting for authenticated endpoints
const generalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per minute
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/profile',
  generalRateLimiter,
  authenticate,
  authController.getProfile.bind(authController)
);

export default router;
