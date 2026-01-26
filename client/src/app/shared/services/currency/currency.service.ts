import { inject, Injectable, signal } from '@angular/core';
import { Currency, CurrencyApiResponse } from '../../models/currency.model';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { supportedCodesApiResponseToCurrencies } from '../../utils/currency';

const API_URL = 'https://v6.exchangerate-api.com/v6';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly http = new HttpClient(inject(HttpBackend));
  readonly currencies = signal<Currency[]>([]);
  readonly error = signal<string | null>(null);
  readonly loading = signal(false);
  getAll() {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<CurrencyApiResponse>(`${API_URL}/${environment.CURRENCY_API_KEY}/codes`, {
        withCredentials: false,
      })
      .pipe(
        map((response) => supportedCodesApiResponseToCurrencies(response)),
        catchError((error) => {
          this.error.set('Failed to fetch currencies');
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (currencies) => {
          this.currencies.set(currencies);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }
  constructor() {
    if (this.currencies().length === 0 && !this.loading()) {
      this.getAll();
    }
  }
}
