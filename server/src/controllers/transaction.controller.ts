import { Request, Response, NextFunction } from "express";
import { transactionService } from "../services/transaction.service";
import {
  createTransactionSchema,
  queryTransactionSchema,
} from "../validators/transaction.validator";
import { AppError, BadRequestError, NotFoundError } from "../utils/errors";
import { AuthRequest } from "../types";

export class TransactionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = createTransactionSchema.safeParse(req.body);
      if (!result.success) {
        throw new AppError(result.error.errors[0].message);
      }
      const userId = (req as AuthRequest).userId;
      if (!userId) {
        throw new AppError("No user ID");
      }
      const transaction = await transactionService.create(userId, result.data);

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = queryTransactionSchema.safeParse(req.query);

      if (!result.success) {
        throw new BadRequestError(result.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }
      const data = await transactionService.findAll(userId, result.data);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      // Check if exists first? Or deleteMany handles "not found" by deleting 0.
      // If we want 404 for non-existent:
      const existing = await transactionService.findOne(userId, id);
      if (!existing) {
        throw new NotFoundError("Transaction not found");
      }

      await transactionService.delete(userId, id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = createTransactionSchema.safeParse(req.body);
      if (!result.success) {
        throw new AppError(result.error.errors[0].message);
      }
      const userId = (req as AuthRequest).userId;

      if (!userId) {
        throw new AppError("No user ID");
      }

      const existing = await transactionService.findOne(userId, id);
      if (!existing) {
        throw new NotFoundError("Transaction not found");
      }

      const transaction = await transactionService.update(
        userId,
        id,
        result.data
      );
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  }
}

export const transactionController = new TransactionController();
