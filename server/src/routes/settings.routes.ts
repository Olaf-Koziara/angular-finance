import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Apply authentication to all settings routes
router.use(authenticate);

// Get user settings
router.get("/", settingsController.getSettings);

// Update user settings (full update)
router.put("/", settingsController.updateSettings);

// Update only background
router.put("/background", settingsController.updateBackground);

// Update only theme
router.put("/theme", settingsController.updateTheme);

// Delete user settings
router.delete("/", settingsController.deleteSettings);

export default router;
