import { prisma } from "../config/database";
import { UserSettings } from "../types/settings";
import { UpdateSettingsInput } from "../validators/settings.validator";
import { logger } from "../utils/logger";

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
    data: UpdateSettingsInput
  ): Promise<UserSettings> {
    try {
      const settings = await prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          background: data.background ?? null,
          theme: data.theme ?? null,
        },
        update: {
          background: data.background ?? null,
          theme: data.theme ?? null,
        },
      });

      logger.info("User settings updated", { userId });

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error("Error updating user settings", { userId, error });
      throw error;
    }
  }

  /**
   * Update only background setting
   * @param userId - User ID
   * @param background - Background value
   * @returns Updated UserSettings
   */
  async updateBackground(
    userId: string,
    background: string | null
  ): Promise<UserSettings> {
    try {
      const settings = await prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          background,
        },
        update: {
          background,
        },
      });

      logger.info("User background updated", { userId });

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error("Error updating user background", { userId, error });
      throw error;
    }
  }

  /**
   * Update only theme setting
   * @param userId - User ID
   * @param theme - Theme value ('light' or 'dark')
   * @returns Updated UserSettings
   */
  async updateTheme(userId: string, theme: "light" | "dark" | null): Promise<UserSettings> {
    try {
      const settings = await prisma.userSettings.upsert({
        where: { userId },
        create: {
          userId,
          theme,
        },
        update: {
          theme,
        },
      });

      logger.info("User theme updated", { userId, theme });

      return {
        id: settings.id,
        userId: settings.userId,
        background: settings.background,
        theme: settings.theme,
        createdAt: settings.createdAt,
        updatedAt: settings.updatedAt,
      };
    } catch (error) {
      logger.error("Error updating user theme", { userId, error });
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
