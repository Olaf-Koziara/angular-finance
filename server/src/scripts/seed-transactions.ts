#!/usr/bin/env tsx

/**
 * Script to seed realistic transactions for the last 6 months
 * Usage: tsx src/scripts/seed-transactions.ts <email> <password>
 * Or set EMAIL and PASSWORD environment variables
 */

const API_URL = process.env.API_URL || "http://localhost:3000/api";

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface IncomeTemplate {
  title: string;
  amount: number;
  frequency: "monthly" | "biweekly" | "weekly" | "occasional";
  variance: number; // percentage variance
}

interface ExpenseTemplate {
  title: string;
  category: string;
  amount: number;
  frequency: "monthly" | "biweekly" | "weekly" | "daily" | "occasional";
  variance: number;
}

// Realistic income templates
const incomeTemplates: IncomeTemplate[] = [
  { title: "Salary", amount: 4500, frequency: "monthly", variance: 0 },
  {
    title: "Freelance Project",
    amount: 800,
    frequency: "occasional",
    variance: 50,
  },
  {
    title: "Investment Dividends",
    amount: 150,
    frequency: "monthly",
    variance: 20,
  },
  { title: "Side Gig", amount: 300, frequency: "biweekly", variance: 30 },
];

// Realistic expense templates
const expenseTemplates: ExpenseTemplate[] = [
  // Housing
  {
    title: "Rent",
    category: "Housing",
    amount: 1200,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Mortgage Payment",
    category: "Housing",
    amount: 850,
    frequency: "monthly",
    variance: 0,
  },

  // Utilities
  {
    title: "Electricity Bill",
    category: "Utilities",
    amount: 120,
    frequency: "monthly",
    variance: 15,
  },
  {
    title: "Water Bill",
    category: "Utilities",
    amount: 45,
    frequency: "monthly",
    variance: 10,
  },
  {
    title: "Internet",
    category: "Utilities",
    amount: 65,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Phone Bill",
    category: "Utilities",
    amount: 55,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Gas Bill",
    category: "Utilities",
    amount: 80,
    frequency: "monthly",
    variance: 25,
  },

  // Food
  {
    title: "Grocery Shopping",
    category: "Food",
    amount: 180,
    frequency: "weekly",
    variance: 20,
  },
  {
    title: "Restaurant",
    category: "Food",
    amount: 45,
    frequency: "weekly",
    variance: 50,
  },
  {
    title: "Coffee Shop",
    category: "Food",
    amount: 5,
    frequency: "daily",
    variance: 0,
  },
  {
    title: "Fast Food",
    category: "Food",
    amount: 12,
    frequency: "weekly",
    variance: 30,
  },
  {
    title: "Takeout",
    category: "Food",
    amount: 25,
    frequency: "weekly",
    variance: 40,
  },

  // Transport
  {
    title: "Gas",
    category: "Transport",
    amount: 60,
    frequency: "weekly",
    variance: 25,
  },
  {
    title: "Public Transport",
    category: "Transport",
    amount: 45,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Uber/Taxi",
    category: "Transport",
    amount: 20,
    frequency: "weekly",
    variance: 60,
  },
  {
    title: "Car Maintenance",
    category: "Transport",
    amount: 150,
    frequency: "occasional",
    variance: 100,
  },
  {
    title: "Parking",
    category: "Transport",
    amount: 8,
    frequency: "daily",
    variance: 0,
  },

  // Entertainment
  {
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: 15,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Spotify Subscription",
    category: "Entertainment",
    amount: 10,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Movie Tickets",
    category: "Entertainment",
    amount: 30,
    frequency: "monthly",
    variance: 50,
  },
  {
    title: "Concert",
    category: "Entertainment",
    amount: 75,
    frequency: "occasional",
    variance: 50,
  },
  {
    title: "Video Games",
    category: "Entertainment",
    amount: 60,
    frequency: "occasional",
    variance: 40,
  },
  {
    title: "Books",
    category: "Entertainment",
    amount: 15,
    frequency: "monthly",
    variance: 30,
  },

  // Health
  {
    title: "Gym Membership",
    category: "Health",
    amount: 50,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Pharmacy",
    category: "Health",
    amount: 35,
    frequency: "monthly",
    variance: 40,
  },
  {
    title: "Doctor Visit",
    category: "Health",
    amount: 120,
    frequency: "occasional",
    variance: 30,
  },
  {
    title: "Dental Checkup",
    category: "Health",
    amount: 150,
    frequency: "occasional",
    variance: 20,
  },

  // Education
  {
    title: "Online Course",
    category: "Education",
    amount: 99,
    frequency: "occasional",
    variance: 50,
  },
  {
    title: "Books (Educational)",
    category: "Education",
    amount: 45,
    frequency: "occasional",
    variance: 40,
  },

  // Other
  {
    title: "Clothing",
    category: "Other",
    amount: 80,
    frequency: "monthly",
    variance: 60,
  },
  {
    title: "Haircut",
    category: "Other",
    amount: 35,
    frequency: "monthly",
    variance: 0,
  },
  {
    title: "Gifts",
    category: "Other",
    amount: 50,
    frequency: "monthly",
    variance: 100,
  },
  {
    title: "Charity Donation",
    category: "Other",
    amount: 25,
    frequency: "monthly",
    variance: 50,
  },
];

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyVariance(amount: number, variance: number): number {
  const varianceAmount = (amount * variance) / 100;
  const min = amount - varianceAmount;
  const max = amount + varianceAmount;
  return Math.round(getRandomFloat(min, max) * 100) / 100;
}

function generateTransactionsForPeriod(
  startDate: Date,
  endDate: Date
): Transaction[] {
  const transactions: Transaction[] = [];

  // Generate income transactions
  for (const income of incomeTemplates) {
    let date = new Date(startDate);

    while (date <= endDate) {
      const amount = applyVariance(income.amount, income.variance);
      transactions.push({
        title: income.title,
        amount,
        category: "Other", // Income doesn't have category in the model, but API might need it
        date: date.toISOString(),
        type: "income",
      });

      // Calculate next occurrence
      switch (income.frequency) {
        case "monthly":
          date = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );
          break;
        case "biweekly":
          date = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
          break;
        case "weekly":
          date = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "occasional":
          // Random occurrence 1-3 times in 6 months
          const monthsToAdd = getRandomInt(1, 3);
          date = new Date(
            date.getFullYear(),
            date.getMonth() + monthsToAdd,
            date.getDate()
          );
          break;
      }
    }
  }

  // Generate expense transactions
  for (const expense of expenseTemplates) {
    let date = new Date(startDate);

    while (date <= endDate) {
      const amount = applyVariance(expense.amount, expense.variance);
      transactions.push({
        title: expense.title,
        amount,
        category: expense.category,
        date: date.toISOString(),
        type: "expense",
      });

      // Calculate next occurrence
      switch (expense.frequency) {
        case "monthly":
          date = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          );
          break;
        case "biweekly":
          date = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
          break;
        case "weekly":
          date = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "daily":
          // Add some randomness - not every day
          const daysToAdd = getRandomInt(1, 3);
          date = new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
          break;
        case "occasional":
          // Random occurrence 1-4 times in 6 months
          const daysToAddOccasional = getRandomInt(15, 60);
          date = new Date(
            date.getTime() + daysToAddOccasional * 24 * 60 * 60 * 1000
          );
          break;
      }
    }
  }

  // Shuffle transactions to make them more realistic
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
}

async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Login failed: ${response.status} ${error}`);
  }

  const data = (await response.json()) as { data: { accessToken: string } };
  return data.data.accessToken;
}

async function createTransaction(
  token: string,
  transaction: Transaction
): Promise<void> {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to create transaction "${transaction.title}": ${response.status} ${error}`
    );
  }
}

async function main() {
  const email = process.argv[2] || process.env.EMAIL;
  const password = process.argv[3] || process.env.PASSWORD;

  if (!email || !password) {
    console.error(
      "Usage: tsx src/scripts/seed-transactions.ts <email> <password>"
    );
    console.error("Or set EMAIL and PASSWORD environment variables");
    process.exit(1);
  }

  try {
    console.log("🔐 Logging in...");
    const token = await login(email, password);
    console.log("✅ Login successful\n");

    // Generate transactions for the last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    console.log(
      `📅 Generating transactions from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}...`
    );
    const transactions = generateTransactionsForPeriod(startDate, endDate);

    console.log(`📊 Generated ${transactions.length} transactions`);
    console.log(
      `   Income: ${transactions.filter((t) => t.type === "income").length}`
    );
    console.log(
      `   Expenses: ${
        transactions.filter((t) => t.type === "expense").length
      }\n`
    );

    console.log("💾 Creating transactions...");
    let successCount = 0;
    let errorCount = 0;

    // Create transactions in batches to avoid overwhelming the server
    const batchSize = 10;
    for (let i = 0; i < transactions.length; i += batchSize) {
      const batch = transactions.slice(i, i + batchSize);
      const promises = batch.map((transaction) =>
        createTransaction(token, transaction)
          .then(() => {
            successCount++;
            if (successCount % 50 === 0) {
              process.stdout.write(
                `   Created ${successCount} transactions...\r`
              );
            }
          })
          .catch((error) => {
            errorCount++;
            console.error(`\n   ❌ Error: ${error.message}`);
          })
      );

      await Promise.all(promises);

      // Small delay between batches
      if (i + batchSize < transactions.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    console.log("\n");
    console.log("✅ Seeding completed!");
    console.log(`   ✅ Success: ${successCount}`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount}`);
    }

    // Calculate totals
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    console.log(`\n💰 Summary:`);
    console.log(`   Total Income: $${totalIncome.toFixed(2)}`);
    console.log(`   Total Expenses: $${totalExpenses.toFixed(2)}`);
    console.log(`   Net: $${(totalIncome - totalExpenses).toFixed(2)}`);
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
