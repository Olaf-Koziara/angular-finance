## 2025-02-16 - Database Aggregation Optimization
**Learning:** Using `prisma.groupBy` is significantly more efficient than fetching all records and aggregating in memory, especially for large datasets. It reduces both database load and network transfer.
**Action:** Always check for `aggregate` or `groupBy` opportunities when seeing `findMany` followed by manual summation loops.

## 2025-02-16 - Prisma Migrations in Sandbox
**Learning:** Generating Prisma migrations requires a running database (shadow DB) or at least a valid connection. In a sandbox without a running Postgres, `migrate diff` fails.
**Action:** Be prepared to manually create migration files if the environment restricts running migration commands, ensuring the SQL matches the schema change exactly.

## 2025-02-16 - Prisma Raw Queries for Time Series
**Learning:** `prisma.groupBy` does not support grouping by derived date fields (e.g., month). `prisma.$queryRaw` with `DATE_TRUNC` (Postgres) is necessary but requires careful table/column quoting (`"transactions"`) and type handling.
**Action:** When optimizing time-series aggregations, use `$queryRaw` but ensure queries are dialect-compatible and verified with unit tests that mock the raw query structure.
