import { computed, Injectable, signal } from '@angular/core';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly settings = signal<Settings>({});
  readonly background = computed(() => this.settings().background);
  updateSetting(setting: keyof Settings, value: string) {
    this.settings.update((prevValue) => ({ ...prevValue, [setting]: value }));
  }
}
