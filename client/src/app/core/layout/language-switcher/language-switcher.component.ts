import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { Language, TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-language-switcher',
    templateUrl: './language-switcher.component.html',
    styleUrls: ['./language-switcher.component.scss'],
    imports: [MatSelectModule, MatOptionModule, MatFormFieldModule, MatIconModule, MatButtonModule, TranslateModule],
    standalone: true,
})
export class LanguageSwitcherComponent {
    translate = inject(TranslateService);
    currentLang = signal<Language>(this.translate.getCurrentLang());
    languages = this.translate.getLangs();
    onLanguageChange(languageCode:Language ){
        this.translate.use(languageCode);
        this.currentLang.set(languageCode);
    }
}