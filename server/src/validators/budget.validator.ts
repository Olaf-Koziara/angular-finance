import { z } from "zod";

const categoryBudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be non-negative"),
});

export const createBudgetSchema = z.object({
  generalBudget: z.number().min(0, "General budget must be non-negative"),
  categoryBudgets: z
    .array(categoryBudgetSchema)
    .optional()
    .default([]),
});

export const updateGeneralBudgetSchema = z.object({
  amount: z.number().min(0, "Amount must be non-negative"),
});

export const updateCategoryBudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be non-negative"),
});

export const updateBudgetSchema = z.object({
  generalBudget: z.number().min(0, "General budget must be non-negative").optional(),
  categoryBudgets: z
    .array(categoryBudgetSchema)
    .optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateGeneralBudgetInput = z.infer<typeof updateGeneralBudgetSchema>;
export type UpdateCategoryBudgetInput = z.infer<typeof updateCategoryBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
export type CategoryBudgetInput = z.infer<typeof categoryBudgetSchema>;



