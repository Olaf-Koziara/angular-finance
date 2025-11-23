import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { AuthRequest } from '../types';
import { NotFoundError } from '../utils/errors';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: RegisterInput = req.body;
      const result = await authService.register(data);
      sendSuccess(res, result, 'User registered successfully', 201);
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
      sendSuccess(res, result, 'Login successful');
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
