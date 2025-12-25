import { Prisma } from "@prisma/client";
import { prisma } from "../config/database";
import {
  CreateBudgetInput,
  UpdateGeneralBudgetInput,
  UpdateCategoryBudgetInput,
  UpdateBudgetInput,
} from "../validators/budget.validator";
import { NotFoundError } from "../utils/errors";

export class BudgetService {
  async getBudget(userId: string) {
    const budget = await prisma.budget.findUnique({
      where: { userId },
      include: {
        categoryBudgets: true,
      },
    });

    if (!budget) {
      return null;
    }

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: budget.categoryBudgets.map((cb) => ({
        ...cb,
        amount: cb.amount.toNumber(),
      })),
    };
  }

  async create(userId: string, data: CreateBudgetInput) {
    // Check if budget already exists
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (existingBudget) {
      throw new Error("Budget already exists for this user");
    }

    const budget = await prisma.budget.create({
      data: {
        userId,
        generalBudget: new Prisma.Decimal(data.generalBudget),
        categoryBudgets: {
          create: data.categoryBudgets.map((cb) => ({
            category: cb.category,
            amount: new Prisma.Decimal(cb.amount),
          })),
        },
      },
      include: {
        categoryBudgets: true,
      },
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: budget.categoryBudgets.map((cb) => ({
        ...cb,
        amount: cb.amount.toNumber(),
      })),
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
      include: {
        categoryBudgets: true,
      },
    });

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: budget.categoryBudgets.map((cb) => ({
        ...cb,
        amount: cb.amount.toNumber(),
      })),
    };
  }

  async updateCategoryBudget(userId: string, data: UpdateCategoryBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
      include: {
        categoryBudgets: true,
      },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    // Check if category budget exists
    const existingCategoryBudget = existingBudget.categoryBudgets.find(
      (cb) => cb.category === data.category
    );

    if (existingCategoryBudget) {
      // Update existing category budget
      await prisma.categoryBudget.update({
        where: { id: existingCategoryBudget.id },
        data: {
          amount: new Prisma.Decimal(data.amount),
        },
      });
    } else {
      // Create new category budget
      await prisma.categoryBudget.create({
        data: {
          budgetId: existingBudget.id,
          category: data.category,
          amount: new Prisma.Decimal(data.amount),
        },
      });
    }

    // Fetch updated budget
    const budget = await prisma.budget.findUnique({
      where: { userId },
      include: {
        categoryBudgets: true,
      },
    });

    if (!budget) {
      throw new NotFoundError("Budget not found after update");
    }

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: budget.categoryBudgets.map((cb) => ({
        ...cb,
        amount: cb.amount.toNumber(),
      })),
    };
  }

  async update(userId: string, data: UpdateBudgetInput) {
    const existingBudget = await prisma.budget.findUnique({
      where: { userId },
    });

    if (!existingBudget) {
      throw new NotFoundError("Budget not found");
    }

    // Update general budget if provided
    if (data.generalBudget !== undefined) {
      await prisma.budget.update({
        where: { userId },
        data: {
          generalBudget: new Prisma.Decimal(data.generalBudget),
        },
      });
    }

    // Update category budgets if provided
    if (data.categoryBudgets && data.categoryBudgets.length > 0) {
      // Delete existing category budgets
      await prisma.categoryBudget.deleteMany({
        where: { budgetId: existingBudget.id },
      });

      // Create new category budgets
      await prisma.categoryBudget.createMany({
        data: data.categoryBudgets.map((cb) => ({
          budgetId: existingBudget.id,
          category: cb.category,
          amount: new Prisma.Decimal(cb.amount),
        })),
      });
    }

    // Fetch updated budget
    const budget = await prisma.budget.findUnique({
      where: { userId },
      include: {
        categoryBudgets: true,
      },
    });

    if (!budget) {
      throw new NotFoundError("Budget not found after update");
    }

    return {
      ...budget,
      generalBudget: budget.generalBudget.toNumber(),
      categoryBudgets: budget.categoryBudgets.map((cb) => ({
        ...cb,
        amount: cb.amount.toNumber(),
      })),
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



