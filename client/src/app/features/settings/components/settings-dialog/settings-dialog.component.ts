import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LucideAngularModule, Palette, Settings as SettingsIcon, Wallet } from 'lucide-angular';
import { Settings } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';
import { BackgroundPicker } from '../background-picker/background-picker.component';
import { CurrencyPicker } from '../currency-picker/currency-picker';

@Component({
    selector: 'app-settings-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        LucideAngularModule,
        MatCardModule,
        BackgroundPicker, 
        CurrencyPicker, 
    ],
    templateUrl: './settings-dialog.component.html',
    styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {
    readonly settingsService = inject(SettingsService);
    readonly icons = { Palette, Wallet, Settings: SettingsIcon };

  
    updateSetting(setting: keyof Settings, value: string | undefined) {
      this.settingsService.updateSetting(setting, value || '');
    }

}
