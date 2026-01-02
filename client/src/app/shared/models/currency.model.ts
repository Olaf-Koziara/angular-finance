export type CurrencyCode = readonly [code: string, name: string];

export interface CurrencyApiResponse {
  readonly result: string;
  readonly documentation: string;
  readonly terms_of_use: string;
  readonly supported_codes: readonly CurrencyCode[];
}

export interface Currency {
  readonly code: string;
  readonly name: string;
}
