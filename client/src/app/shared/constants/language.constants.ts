export enum LanguageCode {
  EN = 'en',
  PL = 'pl',
}

export const SUPPORTED_LANGUAGES: LanguageCode[] = [LanguageCode.EN, LanguageCode.PL];

export const DEFAULT_LANGUAGE = LanguageCode.EN;

export const LANGUAGE_TRANSLATION_KEYS: Record<LanguageCode, string> = {
  [LanguageCode.EN]: 'GENERAL.ENGLISH',
  [LanguageCode.PL]: 'GENERAL.POLISH',
};
