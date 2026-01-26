import { Router } from "express";
import { settingsController } from "../controllers/settings.controller";
import { authenticate } from "../middleware/auth.middleware";

const router: Router = Router();

// Apply authentication to all settings routes
router.use(authenticate);

// Get user settings
router.get("/", settingsController.getSettings);

// Update user settings (full update)
router.put("/", settingsController.updateSettings);

// Update specific setting
router.patch("/:key", settingsController.updateSetting);

// Delete user settings
router.delete("/", settingsController.deleteSettings);

export default router;
