import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { SettingsDialogComponent } from '../../../features/settings/components/settings-dialog/settings-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    RouterLink,
    AsyncPipe,
    TranslateModule,
    HeaderComponent,
    RouterLink,
    SettingsDialogComponent,
    MatDialogModule,
  ],
})
export class SidebarComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly authService = inject(AuthService);
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MatDialog);
  languages = [
    { code: 'en', name: 'GENERAL.ENGLISH' },
    { code: 'pl', name: 'GENERAL.POLISH' },
  ];

  currentLang = this.translate.currentLang;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  logout(): void {
    this.authService.logout();
  }
  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
