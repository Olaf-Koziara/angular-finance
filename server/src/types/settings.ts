export interface UserSettings {
  id?: string;
  userId?: string;
  background?: string | null;
  theme?: string | null;
  currency?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSettingsDto {
  background?: string | null;
  theme?: string | null;
}
