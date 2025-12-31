import { z } from "zod";

// Theme validation - only allow 'light' or 'dark'
const themeSchema = z.enum(["light", "dark"], {
  errorMap: () => ({ message: "Theme must be either 'light' or 'dark'" }),
});

// Background validation - allow CSS color, gradient, or image URL
const backgroundSchema = z
  .string()
  .max(500, "Background value is too long")
  .optional()
  .nullable();

export const updateSettingsSchema = z.object({
  background: backgroundSchema,
  theme: themeSchema.optional().nullable(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
