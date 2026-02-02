## 2024-05-22 - Prisma Aggregation Bug & Optimization
**Learning:** Prisma's `groupBy` returns aggregated fields nested under `_sum` (e.g., `result._sum.amount`), but existing code might incorrectly access them as top-level properties (e.g., `result.amount`), leading to silent failures (0 values) if strict typing isn't enforced or runtime checks mask undefined.
**Action:** Always verify the structure of `groupBy` results and prefer using `queryRaw` for complex aggregations like date truncation where Prisma's `groupBy` is limited.
