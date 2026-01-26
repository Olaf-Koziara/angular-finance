## 2025-02-16 - Database Aggregation Optimization
**Learning:** Using `prisma.groupBy` is significantly more efficient than fetching all records and aggregating in memory, especially for large datasets. It reduces both database load and network transfer.
**Action:** Always check for `aggregate` or `groupBy` opportunities when seeing `findMany` followed by manual summation loops.

## 2025-02-16 - Prisma Migrations in Sandbox
**Learning:** Generating Prisma migrations requires a running database (shadow DB) or at least a valid connection. In a sandbox without a running Postgres, `migrate diff` fails.
**Action:** Be prepared to manually create migration files if the environment restricts running migration commands, ensuring the SQL matches the schema change exactly.
