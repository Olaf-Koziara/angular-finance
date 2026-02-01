## 2024-05-24 - Prisma Aggregation Typings
**Learning:** Prisma `groupBy` queries return aggregated fields nested under `_sum` (e.g., `result._sum.amount`), not as top-level properties. Previous code accessed `result.amount` which was undefined.
**Action:** Always verify `groupBy` result structure and access nested aggregates.

## 2024-05-24 - Parallelize Independent Queries
**Learning:** To optimize latency in dashboard endpoints, independent Prisma queries and service calls should be executed in parallel using `Promise.all`.
**Action:** Identify independent data fetches and group them in `Promise.all` at the start of the service method.
