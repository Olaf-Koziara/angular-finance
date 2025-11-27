import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
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
  authenticate,
  authController.logoutAll.bind(authController)
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  '/profile',
  authenticate,
  authController.getProfile.bind(authController)
);

export default router;
