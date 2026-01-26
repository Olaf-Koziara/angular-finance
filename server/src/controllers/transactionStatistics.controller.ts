import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { AppError, BadRequestError } from "../utils/errors";
import { transactionStatisticsService } from "../services/transactionStatistics.service";
import {
  transactionStatisticsQuerySchema,
} from "../validators/transactionStatistics.validator";

export class TransactionStatisticsController {
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = transactionStatisticsQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        throw new BadRequestError(parsed.error.errors[0].message);
      }

      const userId = (req as AuthRequest).userId;
      if (!userId) {
        throw new AppError("No user ID");
      }

      const data = await transactionStatisticsService.getDashboardStatistics(
        userId,
        parsed.data.months ?? 6
      );

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

export const transactionStatisticsController = new TransactionStatisticsController();


