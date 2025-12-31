import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualSettings } from '../../components/visual-settings/visual-settings.component';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-settings-page',
  imports: [MatTabsModule, VisualSettings, MatCardModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {}
