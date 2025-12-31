import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from './core/icons/icons.service';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from './features/settings/services/settings.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, RouterOutlet, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-finance');
  readonly settingsService = inject(SettingsService);
  selectedBackground = this.settingsService.background;
  constructor(private translate: TranslateService, private iconsService: IconsService) {
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
