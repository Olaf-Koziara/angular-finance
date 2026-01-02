import { Component, inject } from '@angular/core';
import { BackgroundPicker } from '../../components/background-picker/background-picker.component';
import { CurrencyPicker } from '../../components/currency-picker/currency-picker';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';
import { LucideAngularModule, Settings as SettingsIcon, Palette, DollarSign, Wallet } from 'lucide-angular';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [BackgroundPicker, CurrencyPicker, LucideAngularModule, MatCardModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  readonly settingsService = inject(SettingsService);
  readonly icons = { Settings: SettingsIcon, Palette, DollarSign, Wallet };

  updateSetting(setting: keyof Settings, value: string | undefined) {
    this.settingsService.updateSetting(setting, value || '');
  }
}
