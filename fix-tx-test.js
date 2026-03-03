const fs = require('fs');
const file = 'client/src/app/features/transactions/components/transaction-list/transaction-list.component.spec.ts';
let code = fs.readFileSync(file, 'utf8');

// The code has:
//       .overrideComponent(TransactionListComponent, {
//         remove: {
//           imports: [],
//         },
//         add: {
//           imports: [MockLoaderComponent],
//         },
//       })

code = code.replace(
  /remove: \{\s*imports: \[\],\s*\}/,
  "remove: { imports: [LoaderComponent] }"
);

fs.writeFileSync(file, code);
