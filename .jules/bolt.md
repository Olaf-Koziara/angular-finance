## 2025-02-16 - Database Aggregation Optimization
**Learning:** Using `prisma.groupBy` is significantly more efficient than fetching all records and aggregating in memory, especially for large datasets. It reduces both database load and network transfer.
**Action:** Always check for `aggregate` or `groupBy` opportunities when seeing `findMany` followed by manual summation loops.

## 2025-02-16 - Prisma Migrations in Sandbox
**Learning:** Generating Prisma migrations requires a running database (shadow DB) or at least a valid connection. In a sandbox without a running Postgres, `migrate diff` fails.
**Action:** Be prepared to manually create migration files if the environment restricts running migration commands, ensuring the SQL matches the schema change exactly.

## 2025-02-16 - Optimization via Promise.all and Raw Queries
**Learning:** Combining multiple independent DB queries into a single `Promise.all` improves latency. Also, replacing heavy `findMany` + in-memory processing with `$queryRaw` (using `DATE_TRUNC`) for time-series aggregation drastically reduces memory usage and transfer size.
**Action:** When optimizing dashboard-like endpoints, identify independent queries and batch them. Use raw SQL for complex date grouping if ORM support is limited.
