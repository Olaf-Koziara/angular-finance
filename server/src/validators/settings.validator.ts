import { z } from "zod";

const themeSchema = z.enum(["light", "dark"], {
  errorMap: () => ({ message: "Theme must be either 'light' or 'dark'" }),
});

const backgroundSchema = z
  .string()
  .max(500, "Background value is too long")
  .optional()
  .nullable();

export const settingsSchemas = {
  theme: themeSchema,
  background: backgroundSchema,
  currency: z.string().optional().nullable(),
} as const;

export type SettingKey = keyof typeof settingsSchemas;


export const updateSettingsSchema = z.object({
  background: backgroundSchema,
  theme: themeSchema.optional().nullable(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
