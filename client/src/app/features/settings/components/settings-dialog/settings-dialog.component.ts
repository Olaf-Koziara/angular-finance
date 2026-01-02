import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LucideAngularModule, Palette, Wallet, Settings as SettingsIcon } from 'lucide-angular';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/settings.model';
import { SettingsPage } from "../../pages/settings-page/settings-page";

@Component({
    selector: 'app-settings-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        LucideAngularModule,
        SettingsPage
    ],
    templateUrl: './settings-dialog.component.html',
    styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {
    readonly settingsService = inject(SettingsService);
    readonly icons = { Palette, Wallet, Settings: SettingsIcon };

}
