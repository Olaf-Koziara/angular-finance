import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Settings, SettingsResponse } from '../models/settings.model';

const DEFAULT_SETTINGS: Settings = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  theme: 'light',
  currency: 'USD',
};

@Injectable({
  providedIn: 'root',
})

export class SettingsService {
  readonly settings = signal<Settings>({ ...DEFAULT_SETTINGS });
  readonly background = computed(() => this.settings().background);
  readonly theme = computed(() => this.settings().theme);
  readonly currency = computed(() => this.settings().currency);
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly userSignal = toSignal(this.authService.user$, {
    initialValue: this.authService.getUserSnapshot(),
  });
  private lastFetchedUserId: string | null = null;

  constructor() {
    effect(() => {
      const currentUser = this.userSignal();

      if (!currentUser) {
        this.lastFetchedUserId = null;
        this.settings.set({ ...DEFAULT_SETTINGS });
        return;
      }

      if (this.lastFetchedUserId === currentUser.id) {
        return;
      }

      this.lastFetchedUserId = currentUser.id;
      this.fetchSettings();
    }, { allowSignalWrites: true });
  }

  updateSetting<K extends keyof Settings>(setting: K, value: Settings[K]) {
    this.settings.update((s) => ({ ...s, [setting]: value }));
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.http
      .patch(`/settings/${setting}`, { value })
      .pipe(take(1), catchError(() => EMPTY))
      .subscribe();
  }

  private fetchSettings() {
    if (!this.authService.isAuthenticated()) {
      this.settings.set({ ...DEFAULT_SETTINGS });
      this.lastFetchedUserId = null;
      return;
    }

    this.http
      .get<SettingsResponse>('/settings')
      .pipe(
        take(1),
        map((response) => this.normalizeSettings(response?.data)),
        catchError(() => {
          this.settings.set({ ...DEFAULT_SETTINGS });
          return EMPTY;
        })
      )
      .subscribe((normalized) => {
        this.settings.set(normalized);
      });
  }

  private normalizeSettings(settings?: Settings | null): Settings {
    return {
      background: settings?.background ?? DEFAULT_SETTINGS.background,
      theme: settings?.theme ?? DEFAULT_SETTINGS.theme,
      currency: settings?.currency ?? DEFAULT_SETTINGS.currency,
    };
  }
}
