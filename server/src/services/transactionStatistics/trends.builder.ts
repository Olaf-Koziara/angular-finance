import { TrendData, MonthBucket } from "./types";
import { round2, percentChange } from "../../utils/number.utils";

/**
 * Builds trend data from month buckets.
 */
export function buildTrends(
  currentMonth: MonthBucket,
  prevMonth: MonthBucket | null,
  monthsBuckets: MonthBucket[]
): TrendData[] {
  const currentNet = currentMonth.income - currentMonth.expenses;
  const prevNet = prevMonth ? prevMonth.income - prevMonth.expenses : 0;

  const savingsRate =
    currentMonth.income > 0
      ? ((currentMonth.income - currentMonth.expenses) / currentMonth.income) * 100
      : 0;
  const prevSavingsRate =
    prevMonth && prevMonth.income > 0
      ? ((prevMonth.income - prevMonth.expenses) / prevMonth.income) * 100
      : 0;

  const avgMonthlyExpenses =
    monthsBuckets.length > 0
      ? monthsBuckets.reduce((acc, b) => acc + b.expenses, 0) / monthsBuckets.length
      : 0;

  return [
    {
      label: "DASHBOARD.BALANCE_CHANGE",
      value: round2(currentNet),
      change: round2(percentChange(currentNet, prevNet)),
    },
    {
      label: "DASHBOARD.STATISTICS.MONTHLY_AVERAGE",
      value: round2(avgMonthlyExpenses),
      change: round2(
        percentChange(currentMonth.expenses, prevMonth ? prevMonth.expenses : 0)
      ),
    },
    {
      label: "DASHBOARD.STATISTICS.SAVINGS_RATE",
      value: round2(savingsRate),
      change: round2(percentChange(savingsRate, prevSavingsRate)),
    },
  ];
}
