import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { Alert } from '../../models/dashboard.models';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, TranslateModule],
  templateUrl: './alerts-list.component.html',
  styleUrl: './alerts-list.component.scss'
})
export class AlertsListComponent {
  alerts = input.required<Alert[]>();

  getAlertClass(type: string): string {
    return `alert-${type}`;
  }
}

