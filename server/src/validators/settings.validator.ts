import validateCurrencyCode from 'validate-currency-code';
import { z } from "zod";

const themeSchema = z.enum(["light", "dark"], {
  errorMap: () => ({ message: "Theme must be either 'light' or 'dark'" }),
});

const backgroundSchema = z
  .string()
  .max(500, "Background value is too long")
  .optional()
  .nullable();
const ISO4217 = z.custom<string>((val)=>validateCurrencyCode(val))
export const settingsSchemas = z.object({
  theme: themeSchema,
  background: backgroundSchema,
  currency: ISO4217.optional().nullable(),
})
export type Settings = z.infer<typeof settingsSchemas>


export const updateSettingsSchema = z.object({
  background: backgroundSchema,
  theme: themeSchema.optional().nullable(),
  currency: ISO4217.optional().nullable(),


});
export type SettingKey = keyof typeof settingsSchemas.shape;
export type SettingSchema<K extends SettingKey> = (typeof settingsSchemas.shape)[K] & z.ZodTypeAny;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
