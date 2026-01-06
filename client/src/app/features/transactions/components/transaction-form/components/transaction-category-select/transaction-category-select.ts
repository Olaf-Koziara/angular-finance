import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-category-select',
  imports: [],
  templateUrl: './transaction-category-select.html',
  styleUrl: './transaction-category-select.scss',
})
export class TransactionCategorySelect {
formControl = input<FormControl>();

}
