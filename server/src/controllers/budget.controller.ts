import { Request, Response, NextFunction } from "express";
import { budgetService } from "../services/budget.service";
import {
  createBudgetSchema,
  updateGeneralBudgetSchema,
  updateCategoryBudgetSchema,
  updateBudgetSchema,
} from "../validators/budget.validator";
import { AppError, BadRequestError, NotFoundError } from "../utils/errors";
import { AuthRequest } from "../types";
import { sendSuccess } from "../utils/response";

export class BudgetController {
  async getBudget(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const budget = await budgetService.getBudget(userId);

      if (!budget) {
        throw new NotFoundError("Budget not found");
      }

      sendSuccess(res, budget, "Budget retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = createBudgetSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const budget = await budgetService.create(userId, result.data);

      sendSuccess(res, budget, "Budget created successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async updateGeneralBudget(req: Request, res: Response, next: NextFunction) {
    try {
      const result = updateGeneralBudgetSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const budget = await budgetService.updateGeneralBudget(
        userId,
        result.data
      );

      sendSuccess(res, budget, "General budget updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryBudget(req: Request, res: Response, next: NextFunction) {
    try {
      const result = updateCategoryBudgetSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const budget = await budgetService.updateCategoryBudget(
        userId,
        result.data
      );

      sendSuccess(res, budget, "Category budget updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = updateBudgetSchema.safeParse(req.body);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const budget = await budgetService.update(userId, result.data);

      sendSuccess(res, budget, "Budget updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      await budgetService.delete(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const budgetController = new BudgetController();
