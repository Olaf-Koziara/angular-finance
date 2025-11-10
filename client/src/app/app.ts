import { Component, OnInit, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from './core/icons/icons.service';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-finance');

  constructor(private translate: TranslateService, private iconsService: IconsService) {
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
