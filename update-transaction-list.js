const fs = require('fs');

const tsFile = 'client/src/app/features/transactions/components/transaction-list/transaction-list.component.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');

tsContent = tsContent.replace(
  "import { MatTableModule } from '@angular/material/table';",
  "import { MatTableModule } from '@angular/material/table';\nimport { MatTooltipModule } from '@angular/material/tooltip';"
);

tsContent = tsContent.replace(
  "    MatChipsModule,\n    TranslateModule,",
  "    MatChipsModule,\n    MatTooltipModule,\n    TranslateModule,"
);

fs.writeFileSync(tsFile, tsContent);

const htmlFile = 'client/src/app/features/transactions/components/transaction-list/transaction-list.component.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

htmlContent = htmlContent.replace(
  `[attr.aria-label]="'TRANSACTIONS.EDIT' | translate">`,
  `[attr.aria-label]="'TRANSACTIONS.EDIT' | translate" [matTooltip]="'TRANSACTIONS.EDIT' | translate">`
);

htmlContent = htmlContent.replace(
  `[attr.aria-label]="'TRANSACTIONS.REMOVE' | translate">`,
  `[attr.aria-label]="'TRANSACTIONS.REMOVE' | translate" [matTooltip]="'TRANSACTIONS.REMOVE' | translate">`
);

fs.writeFileSync(htmlFile, htmlContent);

console.log('Update complete.');
