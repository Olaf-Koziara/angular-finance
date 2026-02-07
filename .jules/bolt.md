## 2025-02-16 - Database Aggregation Optimization
**Learning:** Using `prisma.groupBy` is significantly more efficient than fetching all records and aggregating in memory, especially for large datasets. It reduces both database load and network transfer.
**Action:** Always check for `aggregate` or `groupBy` opportunities when seeing `findMany` followed by manual summation loops.

## 2025-02-16 - Prisma Migrations in Sandbox
**Learning:** Generating Prisma migrations requires a running database (shadow DB) or at least a valid connection. In a sandbox without a running Postgres, `migrate diff` fails.
**Action:** Be prepared to manually create migration files if the environment restricts running migration commands, ensuring the SQL matches the schema change exactly.

## 2025-02-16 - Prisma GroupBy Property Access
**Learning:** `prisma.groupBy` results place aggregated values under `_sum`, `_avg`, etc., not as top-level properties. Direct access (e.g., `item.amount`) is a common bug that might pass loose type checks but fails at runtime or with strict types.
**Action:** Always access aggregated fields via the `_sum` object and ensure strict type checking catches these errors.

## 2025-02-16 - Date Truncation Optimization
**Learning:** Replacing `findMany` with `$queryRaw` allows using database-specific functions like `DATE_TRUNC` which are not supported by Prisma `groupBy` directly, enabling significant data reduction for time-series aggregation.
**Action:** Use `$queryRaw` for time-based grouping (e.g., monthly buckets) to avoid fetching all rows.
