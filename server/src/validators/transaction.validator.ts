import { z } from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  amount: z.number().min(0.01, "Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  date: z.string().datetime(),
  type: z.enum(["income", "expense"]),
});

export const queryTransactionSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => {
      const parsed = val ? parseInt(val, 10) : 1;
      return parsed > 0 ? parsed : 1;
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      const parsed = val ? parseInt(val, 10) : 10;
      return parsed > 0 ? parsed : 10;
    }),
  search: z.string().optional(),
  type: z.enum(["income", "expense", "all"]).optional(),
  "categories[]": z.union([z.string(), z.array(z.string())]).optional(),
  // Also support 'categories' without brackets if parsed that way
  categories: z.union([z.string(), z.array(z.string())]).optional(),
  sortBy: z
    .enum(["date", "amount", "title", "category", "type"])
    .optional()
    .default("date"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type QueryTransactionInput = z.infer<typeof queryTransactionSchema>;
