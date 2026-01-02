import { Router } from "express";
import authRoutes from "./auth.routes";
import transactionRoutes from "./transaction.routes";
import budgetRoutes from "./budget.routes";
import settingsRoutes from "./settings.routes";

const router = Router();

// Health check route
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budgets", budgetRoutes);
router.use("/settings", settingsRoutes);

export default router;
