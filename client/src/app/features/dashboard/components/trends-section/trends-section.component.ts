import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TrendData } from '../../models/dashboard.model';
import { formatCurrency, formatPercentage } from '../../utils/format.utils';

@Component({
  selector: 'app-trends-section',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './trends-section.component.html',
  styleUrl: './trends-section.component.scss',
})
export class TrendsSectionComponent {
  trends = input.required<TrendData[]>();

  formatCurrency = formatCurrency;
  formatPercentage = formatPercentage;
}
