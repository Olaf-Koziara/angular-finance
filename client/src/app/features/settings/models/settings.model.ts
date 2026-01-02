export interface Settings {
  background?: string;
  theme?: string;
  currency?: string;
}
export interface SettingsResponse {
  success: boolean;
  data: Settings;
  message: string;

}