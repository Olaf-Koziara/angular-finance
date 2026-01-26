import { MonthBucket } from "../services/transactionStatistics/types";

export const MONTH_KEYS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1, 0, 0, 0, 0);
}

export function monthKey(date: Date): string {
  return `DASHBOARD.MONTHS.${MONTH_KEYS[date.getMonth()]}`;
}

export function buildMonthBuckets(months: number, now: Date): MonthBucket[] {
  const start = startOfMonth(addMonths(now, -(months - 1)));
  const buckets: MonthBucket[] = [];
  for (let i = 0; i < months; i++) {
    buckets.push({
      monthStart: addMonths(start, i),
      income: 0,
      expenses: 0,
    });
  }
  return buckets;
}
