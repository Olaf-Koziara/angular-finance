import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Language, TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  LANGUAGE_TRANSLATION_KEYS,
  LanguageCode,
  SUPPORTED_LANGUAGES,
} from '../../../shared/constants/language.constants';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    TranslateModule,
    MatMenuModule,
    MatIconModule,
  ],
  standalone: true,
})
export class LanguageSwitcherComponent {
  translate = inject(TranslateService);
  currentLang = signal<Language>(this.translate.currentLang);
  languages = SUPPORTED_LANGUAGES;
  onLanguageChange(languageCode: LanguageCode) {
    this.translate.use(languageCode);
    this.currentLang.set(languageCode);
  }
  getLanguageTranslationKey(languageCode: LanguageCode) {
    return LANGUAGE_TRANSLATION_KEYS[languageCode];
  }

  getLangLabel(): string {
    const current = this.currentLang();
    const translationKey = this.getLanguageTranslationKey(current as LanguageCode);
    return this.translate.instant(translationKey) || current;
  }
}
