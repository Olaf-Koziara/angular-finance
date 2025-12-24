import { z } from "zod";

export const transactionStatisticsQuerySchema = z.object({
  months: z
    .preprocess((value) => {
      if (value === undefined || value === null || value === "") return undefined;
      const num = Number(value);
      return Number.isFinite(num) ? num : value;
    }, z.number().int().min(1).max(24))
    .optional(),
});

export type TransactionStatisticsQueryInput = z.infer<
  typeof transactionStatisticsQuerySchema
>;


