import { computed, inject, Injectable, signal } from '@angular/core';
import { Settings, SettingsResponse } from '../models/settings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class SettingsService {
  readonly settings = signal<Settings>({});
  readonly background = computed(() => this.settings().background);
  readonly theme = computed(() => this.settings().theme);
  readonly currency = computed(() => this.settings().currency);
  private readonly http = inject(HttpClient);
  constructor() {
    this.fetchSettings();
  }
  updateSetting<K extends keyof Settings>(setting: K, value: Settings[K]) {
    this.settings.update((s) => ({ ...s, [setting]: value }));
    this.http.patch(`/settings/${setting}`, { value }).subscribe();
  }
  private fetchSettings() {
    this.http.get<SettingsResponse>('/settings').subscribe((settings) => {
      this.settings.set(settings.data);
    });
  }
}
