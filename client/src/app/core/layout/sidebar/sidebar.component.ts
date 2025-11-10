import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe,
    TranslateModule,
    HeaderComponent,
    RouterLink,
  ],
})
export class SidebarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private translate = inject(TranslateService);

  languages = [
    { code: 'en', name: 'GENERAL.ENGLISH' },
    { code: 'pl', name: 'GENERAL.POLISH' },
  ];

  currentLang = this.translate.currentLang;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  onLanguageChange(langCode: string) {
    this.translate.use(langCode);
    this.currentLang = langCode;
  }
}
