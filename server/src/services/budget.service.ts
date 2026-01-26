import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import {
  CreateBudgetInput,
  UpdateGeneralBudgetInput,
  UpdateCategoryBudgetInput,
  UpdateBudgetInput,
} from "../validators/budget.validator";
import { NotFoundError } from "../utils/errors";
import { Budget, CategoryBudgetsRecord } from "../types/budget";
import { validateCategoryBudgetsAgainstGeneral } from "../utils/budget.utils";

export class BudgetService {
  async getBudget(userId: string): Promise<Budget | null> {
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

    if (existingBudget) {
      throw new Error("Budget already exists for this user");
    }

    // Validate category budgets against general budget
    const categoryBudgets = data.categoryBudgets || {};
    validateCategoryBudgetsAgainstGeneral(categoryBudgets, data.generalBudget);

    const budget = await prisma.budget.create({
      data: {
        userId,
        generalBudget: new Prisma.Decimal(data.generalBudget),
        categoryBudgets: categoryBudgets as Prisma.InputJsonValue,
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

    const currentCategoryBudgets =
      (existingBudget.categoryBudgets as CategoryBudgetsRecord) || {};
    validateCategoryBudgetsAgainstGeneral(currentCategoryBudgets, data.amount);

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

    // Validate updated category budgets against general budget
    const generalBudget = existingBudget.generalBudget.toNumber();
    validateCategoryBudgetsAgainstGeneral(
      updatedCategoryBudgets,
      generalBudget
    );

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

    // Determine the general budget to use for validation
    const generalBudget =
      data.generalBudget !== undefined
        ? data.generalBudget
        : existingBudget.generalBudget.toNumber();

    // Determine the category budgets to use for validation
    const categoryBudgets =
      data.categoryBudgets !== undefined
        ? (data.categoryBudgets as CategoryBudgetsRecord)
        : (existingBudget.categoryBudgets as CategoryBudgetsRecord) || {};

    // Validate if both are being updated or if category budgets are being updated
    if (
      data.categoryBudgets !== undefined ||
      data.generalBudget !== undefined
    ) {
      validateCategoryBudgetsAgainstGeneral(categoryBudgets, generalBudget);
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
