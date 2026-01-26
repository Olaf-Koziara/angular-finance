import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '../../features/settings/services/settings.service';

@Pipe({
    name: 'appCurrency',
    standalone: true,
    pure: false
})
export class AppCurrencyPipe implements PipeTransform {
    private readonly settingsService = inject(SettingsService);

    transform(value: number | string): string {
        const currencyCode = this.settingsService.currency();


        if (typeof value === 'string' && value !== '') {
            return value;
        }
        const numberFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        });
        if (typeof value !== 'number' || value === null || value === undefined) {
            return numberFormat.formatToParts(0)[0].value;
        }


        return numberFormat.format(value);
    }
}
