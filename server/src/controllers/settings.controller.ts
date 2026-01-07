import { NextFunction, Request, Response } from "express";
import { settingsService } from "../services/settings.service";
import { AuthRequest } from "../types";
import { UserSettings } from "../types/settings";
import { AppError, BadRequestError } from "../utils/errors";
import { sendSuccess } from "../utils/response";
import { SettingKey, settingsSchemas, updateSettingsSchema } from "../validators/settings.validator";

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
          currency: settings.currency,
        }
        : {
          background: null,
          theme: null,
          currency: null,
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
        currency: settings.currency,
      };

      sendSuccess(res, settingsData, "Settings updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a specific setting
   * PATCH /api/settings/:key
   */
  async updateSetting(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { key } = req.params;
      const { value } = req.body;
   
      if (!key || !Object.keys(settingsSchemas.shape).includes(key)) {
        throw new BadRequestError(`Invalid setting key: ${key}`);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const settings = await settingsService.updateSetting(
        userId,
        key as SettingKey,
        value
      );

      sendSuccess(
        res,
        { [key]: settings[key as keyof UserSettings] },
        `Setting '${key}' updated successfully`
      );
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
