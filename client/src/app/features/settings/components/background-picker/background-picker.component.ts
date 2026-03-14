import { Component, inject, model, signal } from '@angular/core';
import { backgrounds } from '../../../../shared/constants/backgrounds.constants';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { NgStyle } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-background-picker',
  imports: [NgStyle, MatMenuModule, MatMenuTrigger, TranslateModule],
  templateUrl: './background-picker.component.html',
  styleUrl: './background-picker.component.scss',
})
export class BackgroundPicker {
  readonly backgrounds = backgrounds;
  selectedBackground = model<string>();
  updateSelectedBackground(background: string) {
    this.selectedBackground.set(background);
  }
}
