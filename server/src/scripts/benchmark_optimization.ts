
import { performance } from 'perf_hooks';

// Mocks
interface BudgetConfig {
  key: string;
  categoryMatchers: string[];
}

interface Expense {
  category: string;
  amount: { toString: () => string }; // Mocking Prisma.Decimal
}

const DASHBOARD_BUDGETS: BudgetConfig[] = [
  { key: "Food", categoryMatchers: ["Food", "Groceries", "Dining", "Restaurants"] },
  { key: "Transport", categoryMatchers: ["Transport", "Transportation", "Fuel", "Taxi"] },
  { key: "Entertainment", categoryMatchers: ["Entertainment", "Movies", "Games"] },
  { key: "Utilities", categoryMatchers: ["Utilities", "Water", "Electricity", "Internet"] },
  { key: "Healthcare", categoryMatchers: ["Health", "Healthcare", "Doctor", "Pharmacy"] },
  { key: "Other", categoryMatchers: ["Other", "Housing", "Education", "Rent"] },
];

function decimalToNumber(value: { toString: () => string } | null | undefined): number {
  if (!value) return 0;
  return Number(value.toString());
}

function generateExpenses(count: number): Expense[] {
  const categories = [
    "Food", "Groceries", "Transport", "Fuel", "Entertainment", "Movies",
    "Utilities", "Water", "Health", "Doctor", "Other", "Rent", "UnknownCategory"
  ];
  const expenses: Expense[] = [];
  for (let i = 0; i < count; i++) {
    const amtStr = (Math.random() * 100).toFixed(2);
    expenses.push({
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: { toString: () => amtStr },
    });
  }
  return expenses;
}

function runBenchmark() {
  const expenseCount = 100000;
  const expenses = generateExpenses(expenseCount);
  const populatedConfigs = DASHBOARD_BUDGETS; // Using static config for this test

  console.log(`Running benchmark with ${expenseCount} expenses...`);

  // --- Approach 1: Current Implementation (Nested Loop) ---
  const start1 = performance.now();

  const spentByKey1 = new Map<string, number>();
  for (const item of expenses) {
    const amt = decimalToNumber(item.amount);
    const cfg = populatedConfigs.find((c) =>
      c.categoryMatchers.some(
        (m) => m.toLowerCase() === item.category.toLowerCase()
      )
    );
    const key = cfg?.key ?? "Other";
    spentByKey1.set(key, (spentByKey1.get(key) ?? 0) + amt);
  }

  const end1 = performance.now();
  const time1 = end1 - start1;
  console.log(`Current Implementation: ${time1.toFixed(2)} ms`);


  // --- Approach 2: Optimized Implementation (Map Lookup) ---
  const start2 = performance.now();

  const spentByKey2 = new Map<string, number>();

  // Pre-calculate category -> configKey map
  const categoryToConfigKey = new Map<string, string>();
  for (const cfg of populatedConfigs) {
      for (const matcher of cfg.categoryMatchers) {
          categoryToConfigKey.set(matcher.toLowerCase(), cfg.key);
      }
  }

  for (const item of expenses) {
    const amt = decimalToNumber(item.amount);
    // Direct lookup
    // Note: The original code uses .some(m => m.toLowerCase() === item.category.toLowerCase())
    // which implies case-insensitive match against the matchers.
    // Our map keys are lowercased matchers.
    const key = categoryToConfigKey.get(item.category.toLowerCase()) ?? "Other";
    spentByKey2.set(key, (spentByKey2.get(key) ?? 0) + amt);
  }

  const end2 = performance.now();
  const time2 = end2 - start2;
  console.log(`Optimized Implementation: ${time2.toFixed(2)} ms`);

  // --- Verification ---
  let keysMatch = true;
  if (spentByKey1.size !== spentByKey2.size) {
      console.error(`Size mismatch: ${spentByKey1.size} vs ${spentByKey2.size}`);
      keysMatch = false;
  }

  for (const [key, val] of spentByKey1) {
      const val2 = spentByKey2.get(key);
      if (val2 === undefined || Math.abs(val - val2) > 0.0001) {
          console.error(`Mismatch for key ${key}: ${val} vs ${val2}`);
          keysMatch = false;
      }
  }

  if (keysMatch) {
      console.log("✅ Results match!");
      const improvement = ((time1 - time2) / time1) * 100;
      console.log(`Improvement: ${improvement.toFixed(2)}%`);
  } else {
      console.error("❌ Results do not match!");
      // Debug loop
      for(const item of expenses) {
        // Old logic
        const cfg1 = populatedConfigs.find((c) =>
            c.categoryMatchers.some(
              (m) => m.toLowerCase() === item.category.toLowerCase()
            )
        );
        const key1 = cfg1?.key ?? "Other";

        // New logic
        const key2 = categoryToConfigKey.get(item.category.toLowerCase()) ?? "Other";

        if(key1 !== key2) {
            console.error(`Discrepancy found for category "${item.category}": Old=${key1}, New=${key2}`);
            break;
        }
      }
  }
}

runBenchmark();
