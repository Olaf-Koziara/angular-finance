import { Prisma } from "@prisma/client";

export function decimalToNumber(value: Prisma.Decimal | null | undefined): number {
  if (!value) return 0;
  return Number(value.toString());
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculates the percentage change from `previous` to `current`.
 *
 * - If both `previous` and `current` are 0, returns 0.
 * - If `previous` is 0 and `current` is non-zero, returns `Infinity` to indicate
 *   an unbounded increase from zero.
 * - Otherwise, returns the standard percentage change based on `previous`.
 */
export function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) return 0;
    return Number.POSITIVE_INFINITY;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}
