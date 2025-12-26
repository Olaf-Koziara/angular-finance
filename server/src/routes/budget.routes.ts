import { Router } from "express";
import { budgetController } from "../controllers/budget.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Apply authentication to all budget routes
router.use(authenticate);

router.get("/", budgetController.getBudget);
router.post("/", budgetController.create);
router.put("/", budgetController.update);
router.put("/general", budgetController.updateGeneralBudget);
router.put("/category", budgetController.updateCategoryBudget);
router.delete("/", budgetController.delete);

export default router;
