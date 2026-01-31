## 2025-02-16 - Database Aggregation Optimization
**Learning:** Using `prisma.groupBy` is significantly more efficient than fetching all records and aggregating in memory, especially for large datasets. It reduces both database load and network transfer.
**Action:** Always check for `aggregate` or `groupBy` opportunities when seeing `findMany` followed by manual summation loops.

## 2025-02-16 - Prisma Migrations in Sandbox
**Learning:** Generating Prisma migrations requires a running database (shadow DB) or at least a valid connection. In a sandbox without a running Postgres, `migrate diff` fails.
**Action:** Be prepared to manually create migration files if the environment restricts running migration commands, ensuring the SQL matches the schema change exactly.

## 2025-02-16 - Transaction Statistics Aggregation
**Learning:** Replaced large in-memory dataset fetching with DB-level aggregation using `$queryRaw`. Essential to use `Promise.all` for all independent queries to maximize parallelism. Also, raw SQL comparisons for strings must be case-insensitive to match application logic.
**Action:** Use `$queryRaw` for complex aggregations but verify case sensitivity logic. Bundle all independent queries in `Promise.all`.
