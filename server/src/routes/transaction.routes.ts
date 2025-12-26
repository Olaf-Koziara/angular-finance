import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { transactionStatisticsController } from "../controllers/transactionStatistics.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Apply authentication to all transaction routes
router.use(authenticate);

router.post("/", transactionController.create);
router.get("/statistics", transactionStatisticsController.getDashboard);
router.get("/", transactionController.findAll);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.delete);

export default router;
