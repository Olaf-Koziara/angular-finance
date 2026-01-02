import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency/currency.service';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Currency } from '../../../../shared/models/currency.model';
import { currencyIncludesString } from '../../../../shared/utils/currency';

@Component({
  selector: 'app-currency-picker',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './currency-picker.html',
  styleUrl: './currency-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyPicker implements OnInit {
  currency = model<string>();
  private readonly currencyService = inject(CurrencyService);
  readonly currencies = this.currencyService.currencies;
  filteredCurrencies = signal<Currency[]>([]);
  currentSearch = signal('');

  constructor() {
    effect(() => {
      const current = this.currency();
      if (current) {
        this.currentSearch.set(current);
      }
    });
  }

  ngOnInit() {
    this.filteredCurrencies.set(this.currencies());
  }

  onSearchChange(value: string) {
    this.currentSearch.set(value);
    this.filterCurrencies(value);
  }

  onCurrencySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCode = event.option.value;
    this.currency.set(selectedCode);
    this.currentSearch.set(selectedCode);
  }

  onBlur() {
    const current = this.currency();
    if (current && this.currentSearch() !== current) {
      this.currentSearch.set(current);
    }
  }

  filterCurrencies(value: string) {
    const currentCurrencies = this.currencies();
    const searchTerm = value.toLowerCase();

    this.filteredCurrencies.set(
      currentCurrencies.filter((c) => currencyIncludesString(c, searchTerm))
    );
  }
}
