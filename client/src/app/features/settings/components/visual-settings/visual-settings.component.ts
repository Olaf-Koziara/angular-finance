import { Component } from '@angular/core';
import { BackgroundPicker } from '../background-picker/background-picker.component';
import { CurrencyPicker } from '../currency-picker/currency-picker';

@Component({
  selector: 'app-visual-settings',
  imports: [BackgroundPicker, CurrencyPicker],
  templateUrl: './visual-settings.component.html',
  styleUrl: './visual-settings.component.scss',
})
export class VisualSettings {}
