import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    readonly loading = input.required<boolean>();
}
