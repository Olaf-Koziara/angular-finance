import { z } from "zod";
import { prisma } from "../config/database";
import { UserSettings } from "../types/settings";
import { logger } from "../utils/logger";
import { SettingKey, Settings, SettingSchema, settingsSchemas, UpdateSettingsInput } from "../validators/settings.validator";

const defaultInitalSettings:Settings = {
    background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    theme:'light',
    currency:'USD'
}
export class SettingsService {
  /**
   * Get user settings by userId
   * @param userId - User ID
   * @returns UserSettings or null if not found
   */
  async getSettings(userId: string): Promise<UserSettings | null> {
    try {
      const settings = await prisma.userSettings.findUnique({
        where: { userId },
      });

      if (!settings) {
        return null;
      }

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        currency: settings.currency,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error("Error fetching user settings", { userId, error });
      throw error;
    }
  }

  /**
   * Create or update user settings (upsert)
   * @param userId - User ID
   * @param data - Settings data to update
   * @returns Updated UserSettings
   */
 
  async createOrUpdateSettings(
    userId: string,
    data: UpdateSettingsInput = defaultInitalSettings
  ): Promise<UserSettings> {
    try {
      const settings = await prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          background: data.background ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          theme: data.theme ?? 'light',
          currency: data.currency?? "USD"
        },
        update: {
          ...data
        },
      });

      logger.info("User settings updated", { userId });

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        currency: settings.currency,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error("Error updating user settings", { userId, error });
      throw error;
    }
  }

  /**
   * Update a specific setting
   * @param userId - User ID
   * @param key - Setting key to update
   * @param value - New value for the setting
   * @returns Updated UserSettings
   */
  async updateSetting<K extends SettingKey>(
    userId: string,
    key: K,
    value: z.infer<SettingSchema<K>>
  ): Promise<UserSettings> {
    try {
      // Validate value against schema
      const schema = settingsSchemas.shape[key];
      const result = schema.safeParse(value);

      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      const settings = await prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          [key]: value,
        },
        update: {
          [key]: value,
        },
      });

      logger.info(`User setting '${key}' updated`, { userId });

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        currency: settings.currency,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error(`Error updating user setting '${key}'`, { userId, error });
      throw error;
    }
  }

  /**
   * Delete user settings
   * @param userId - User ID
   */
  async deleteSettings(userId: string): Promise<void> {
    try {
      await prisma.userSettings.delete({
        where: { userId },
      });

      logger.info("User settings deleted", { userId });
    } catch (error) {
      // If settings don't exist, it's not an error
      if ((error as { code?: string }).code === "P2025") {
        logger.warn("Settings not found for deletion", { userId });
        return;
      }

      logger.error("Error deleting user settings", { userId, error });
      throw error;
    }
  }
}

export const settingsService = new SettingsService();
