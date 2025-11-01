import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-finance');

  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    // Initialize the app
  }
}
