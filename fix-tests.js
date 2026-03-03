const fs = require('fs');
const file = 'client/src/app/features/transactions/components/transaction-list/transaction-list.component.spec.ts';
let code = fs.readFileSync(file, 'utf8');

if (code.includes('overrideComponent(TransactionListComponent')) {
  code = code.replace(
    /overrideComponent\(TransactionListComponent, \{\s*set: \{\s*imports: \[(.*?MockLoaderComponent.*?)\]\s*\}\s*\}\)/s,
    "overrideComponent(TransactionListComponent, { remove: { imports: [LoaderComponent] }, add: { imports: [MockLoaderComponent] } })"
  );
  fs.writeFileSync(file, code);
}
