import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency/currency.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Currency } from '../../../../shared/models/currency.model';
import { currencyIncludesString } from '../../../../shared/utils/currency';
@Component({
  selector: 'app-currency-picker',
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
  readonly currencyService = inject(CurrencyService);
  readonly currencies = computed(() => this.currencyService.currencies());
  filteredCurrencies = signal<Currency[]>([]);
  readonly currencyControl = new FormControl();
  ngOnInit() {
    this.filteredCurrencies.set(this.currencies());
    this.currencyControl.valueChanges.subscribe({
      next: (value) => {
        this.filterCurrencies(value);
      },
    });
  }
  filterCurrencies(value: string) {
    if (value.length <= 1) {
      const currentCurrencies = this.currencies();
      this.filteredCurrencies.set(
        currentCurrencies.filter((currency) => currencyIncludesString(currency, value))
      );
    } else {
      this.filteredCurrencies.update((prevValue) =>
        prevValue.filter((currency) => currencyIncludesString(currency, value))
      );
    }
  }
}
