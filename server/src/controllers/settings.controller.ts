import { Request, Response, NextFunction } from "express";
import { settingsService } from "../services/settings.service";
import { updateSettingsSchema } from "../validators/settings.validator";
import { AppError, BadRequestError } from "../utils/errors";
import { AuthRequest } from "../types";
import { sendSuccess } from "../utils/response";

export class SettingsController {
  /**
   * Get user settings
   * GET /api/settings
   */
  async getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const settings = await settingsService.getSettings(userId);

      // Return empty object if settings don't exist (not an error)
      const settingsData = settings
        ? {
            background: settings.background,
            theme: settings.theme,
          }
        : {
            background: null,
            theme: null,
          };

      sendSuccess(res, settingsData, "Settings retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create or update user settings
   * PUT /api/settings
   */
  async updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = updateSettingsSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const settings = await settingsService.createOrUpdateSettings(
        userId,
        result.data
      );

      const settingsData = {
        background: settings.background,
        theme: settings.theme,
      };

      sendSuccess(res, settingsData, "Settings updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update only background
   * PUT /api/settings/background
   */
  async updateBackground(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { background } = req.body;

      if (background !== undefined && typeof background !== "string" && background !== null) {
        throw new BadRequestError("Background must be a string or null");
      }

      if (background && background.length > 500) {
        throw new BadRequestError("Background value is too long");
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const settings = await settingsService.updateBackground(userId, background ?? null);

      sendSuccess(
        res,
        { background: settings.background },
        "Background updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update only theme
   * PUT /api/settings/theme
   */
  async updateTheme(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { theme } = req.body;

      if (theme !== undefined && theme !== null && theme !== "light" && theme !== "dark") {
        throw new BadRequestError("Theme must be either 'light' or 'dark'");
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const settings = await settingsService.updateTheme(
        userId,
        theme ?? null
      );

      sendSuccess(res, { theme: settings.theme }, "Theme updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user settings
   * DELETE /api/settings
   */
  async deleteSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      await settingsService.deleteSettings(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const settingsController = new SettingsController();
