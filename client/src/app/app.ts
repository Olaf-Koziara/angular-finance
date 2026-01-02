import { NgStyle } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from './core/icons/icons.service';
import { SettingsService } from './features/settings/services/settings.service';
import { backgrounds } from './shared/constants/backgrounds.constants';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-finance');
  readonly settingsService = inject(SettingsService);
  readonly backgrounds = backgrounds;
  selectedBackground = this.settingsService.background;
  constructor(private translate: TranslateService, private iconsService: IconsService) {
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
