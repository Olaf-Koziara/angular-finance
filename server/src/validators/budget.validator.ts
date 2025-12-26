import { z } from "zod";

const categoryBudgetsRecordSchema = z
  .record(z.string(), z.number().min(0, "Amount must be non-negative"))
  .optional()
  .default({});

export const createBudgetSchema = z.object({
  generalBudget: z.number().min(0, "General budget must be non-negative"),
  categoryBudgets: categoryBudgetsRecordSchema,
});

export const updateGeneralBudgetSchema = z.object({
  amount: z.number().min(0, "Amount must be non-negative"),
});

export const updateCategoryBudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be non-negative"),
});

export const updateBudgetSchema = z.object({
  generalBudget: z
    .number()
    .min(0, "General budget must be non-negative")
    .optional(),
  categoryBudgets: categoryBudgetsRecordSchema.optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateGeneralBudgetInput = z.infer<
  typeof updateGeneralBudgetSchema
>;
export type UpdateCategoryBudgetInput = z.infer<
  typeof updateCategoryBudgetSchema
>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
