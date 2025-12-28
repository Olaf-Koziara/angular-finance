import { Prisma } from "@prisma/client";

export function decimalToNumber(value: Prisma.Decimal | null | undefined): number {
  if (!value) return 0;
  return Number(value.toString());
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function percentChange(current: number, previous: number): number {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}
