import { CurrencyCode, Currency, CurrencyApiResponse } from '../models/currency.model';

export function currencyCodeToCurrency([code, name]: CurrencyCode): Currency {
  return { code, name };
}

export function supportedCodesApiResponseToCurrencies(response: CurrencyApiResponse): Currency[] {
  return response.supported_codes.map(currencyCodeToCurrency);
}
export function currencyIncludesString(currency: Currency, query: string) {
  query = query.toLowerCase();
  return currency.code.toLowerCase().includes(query) || currency.name.toLowerCase().includes(query);
}
