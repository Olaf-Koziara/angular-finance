## 2025-05-15 - [Database Aggregation vs In-Memory]
**Learning:** The application (specifically `TransactionStatisticsService`) fetches large datasets (e.g., all transactions in 6 months) to perform aggregations in memory. This scales poorly.
**Action:** Prefer `prisma.groupBy` or `aggregate` to offload processing to the database layer whenever possible.
