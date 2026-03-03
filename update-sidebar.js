const fs = require('fs');

const htmlFile = 'client/src/app/core/layout/sidebar/sidebar.component.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

htmlContent = htmlContent.replace(
  `aria-label="Toggle sidenav" mat-icon-button (click)="drawer.toggle()">`,
  `aria-label="Toggle sidenav" mat-icon-button (click)="drawer.toggle()" matTooltip="Toggle Menu">`
);

htmlContent = htmlContent.replace(
  `aria-label="Open user menu" mat-icon-button [matMenuTriggerFor]="userMenu">`,
  `aria-label="Open user menu" mat-icon-button [matMenuTriggerFor]="userMenu" matTooltip="User Menu">`
);

fs.writeFileSync(htmlFile, htmlContent);

const tsFile = 'client/src/app/core/layout/sidebar/sidebar.component.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');
if (!tsContent.includes('MatTooltipModule')) {
    tsContent = tsContent.replace(
        `import { MatSidenavModule } from '@angular/material/sidenav';`,
        `import { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatTooltipModule } from '@angular/material/tooltip';`
    );
    tsContent = tsContent.replace(
        `MatSidenavModule,`,
        `MatSidenavModule,\n    MatTooltipModule,`
    );
    fs.writeFileSync(tsFile, tsContent);
}

console.log('Update complete.');
