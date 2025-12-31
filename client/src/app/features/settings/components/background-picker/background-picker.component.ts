import { Component, inject, signal } from '@angular/core';
import { backgrounds } from '../../../../shared/constants/backgrounds.constants';
import { MatAnchor } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { NgStyle } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-background-picker',
  imports: [NgStyle, MatAnchor, MatMenuModule, MatMenuTrigger, TranslateModule],
  templateUrl: './background-picker.component.html',
  styleUrl: './background-picker.component.scss',
})
export class BackgroundPicker {
  readonly settingService = inject(SettingsService);
  readonly backgrounds = backgrounds;
  readonly selectedBackground = this.settingService.background;
  updateSelectedBackground(background: string) {
    this.settingService.updateSetting('background', background);
  }
}
