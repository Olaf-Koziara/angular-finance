import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Apply authentication to all transaction routes
router.use(authenticate);

router.post("/", transactionController.create);
router.get("/", transactionController.findAll);
router.delete("/:id", transactionController.delete);

export default router;
