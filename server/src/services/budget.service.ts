import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import {
  CreateBudgetInput,
  UpdateGeneralBudgetInput,
  UpdateCategoryBudgetInput,
  UpdateBudgetInput,
} from "../validators/budget.validator";
import { NotFoundError } from "../utils/errors";

type CategoryBudgetsRecord = Record<string, number>;

export class BudgetService {
  async getBudget(userId: string) {
    const budget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!budget) {
      return null;
    }

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: (budget.categoryBudgets as CategoryBudgetsRecord) || {},
    };
  }

  async create(userId: string, data: CreateBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });
    console.log(data);

    if (existingBudget) {
      throw new Error("Budget already exists for this user");
    }

    const budget = await prisma.budget.create({
      data: {
        userId,
        generalBudget: new Prisma.Decimal(data.generalBudget),
        categoryBudgets: (data.categoryBudgets || {}) as Prisma.InputJsonValue,
      },
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: (budget.categoryBudgets as CategoryBudgetsRecord) || {},
    };
  }

  async updateGeneralBudget(userId: string, data: UpdateGeneralBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    const budget = await prisma.budget.update({
      where: { userId },
      data: {
        generalBudget: new Prisma.Decimal(data.amount),
      },
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: (budget.categoryBudgets as CategoryBudgetsRecord) || {},
    };
  }

  async updateCategoryBudget(userId: string, data: UpdateCategoryBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    const currentCategoryBudgets =
      (existingBudget.categoryBudgets as CategoryBudgetsRecord) || {};
    const updatedCategoryBudgets = {
      ...currentCategoryBudgets,
      [data.category]: data.amount,
    };

    const budget = await prisma.budget.update({
      where: { userId },
      data: {
        categoryBudgets: updatedCategoryBudgets as Prisma.InputJsonValue,
      },
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: (budget.categoryBudgets as CategoryBudgetsRecord) || {},
    };
  }

  async update(userId: string, data: UpdateBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    const updateData: {
      generalBudget?: Prisma.Decimal;
      categoryBudgets?: Prisma.InputJsonValue;
    } = {};

    if (data.generalBudget !== undefined) {
      updateData.generalBudget = new Prisma.Decimal(data.generalBudget);
    }

    if (data.categoryBudgets !== undefined) {
      updateData.categoryBudgets =
        data.categoryBudgets as Prisma.InputJsonValue;
    }

    const budget = await prisma.budget.update({
      where: { userId },
      data: updateData,
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: (budget.categoryBudgets as CategoryBudgetsRecord) || {},
    };
  }

  async delete(userId: string) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    await prisma.budget.delete({
      where: { userId },
    });
  }
}

export const budgetService = new BudgetService();
