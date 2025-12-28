# Seed Transactions Script

This script generates realistic income and expense transactions for the last 6 months and adds them to your account.

## Usage

### Option 1: Command line arguments
```bash
npm run seed:transactions <email> <password>
```

### Option 2: Environment variables
```bash
EMAIL=your@email.com PASSWORD=yourpassword npm run seed:transactions
```

### Option 3: Direct execution
```bash
tsx src/scripts/seed-transactions.ts <email> <password>
```

## What it generates

The script creates realistic transactions including:

### Income
- Monthly salary
- Freelance projects (occasional)
- Investment dividends
- Side gigs (biweekly)

### Expenses
- **Housing**: Rent, mortgage
- **Utilities**: Electricity, water, internet, phone, gas
- **Food**: Groceries, restaurants, coffee, takeout
- **Transport**: Gas, public transport, Uber, car maintenance, parking
- **Entertainment**: Subscriptions, movies, concerts, games, books
- **Health**: Gym membership, pharmacy, doctor visits
- **Education**: Online courses, educational books
- **Other**: Clothing, haircuts, gifts, donations

## Features

- Realistic amounts with variance
- Proper frequency distribution (daily, weekly, biweekly, monthly, occasional)
- Transactions distributed across the last 6 months
- Batch processing to avoid overwhelming the server
- Progress tracking and summary statistics

## Requirements

- Server must be running on `http://localhost:3000` (or set `API_URL` environment variable)
- Valid user account credentials
- Authentication token will be obtained automatically

## Example Output

```
🔐 Logging in...
✅ Login successful

📅 Generating transactions from 6/25/2024 to 12/25/2024...
📊 Generated 342 transactions
   Income: 28
   Expenses: 314

💾 Creating transactions...
   Created 342 transactions...

✅ Seeding completed!
   ✅ Success: 342

💰 Summary:
   Total Income: $28,450.00
   Total Expenses: $18,234.50
   Net: $10,215.50
```
