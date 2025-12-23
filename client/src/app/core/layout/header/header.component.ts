import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, startWith, map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LanguageSwitcherComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  private leafRouteSnapshot = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let r = this.activatedRoute.root;
        while (r.firstChild) r = r.firstChild;
        return r.snapshot;
      }),
    ),
    { initialValue: this.activatedRoute.snapshot },
  );
  pageTranslationName = computed(() => this.leafRouteSnapshot().data['pageTranslationName'] ?? '');
}
