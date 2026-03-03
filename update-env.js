const fs = require('fs');
const files = ['client/src/environments/environment.ts', 'client/src/environments/environment.development.ts'];

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace('apiUrl', 'API_URL').replace('currencyApiKey', 'CURRENCY_API_KEY');
  fs.writeFileSync(f, c);
}
