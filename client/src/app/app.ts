import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from './core/icons/icons.service';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-finance');

  constructor(private translate: TranslateService,private iconsService:IconsService) {

    translate.use('en');
  }

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
