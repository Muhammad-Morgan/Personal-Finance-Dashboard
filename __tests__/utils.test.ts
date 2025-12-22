import { describe, expect, test } from "vitest";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

describe("utility helpers", () => {
  test("formats currency in USD with two decimals", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
    expect(formatCurrency(null)).toBe("$0.00");
  });

  test("formats dates using en-US locale", () => {
    const sample = new Date("2025-01-05T12:00:00.000Z");
    expect(formatDate(sample)).toBe("January 5, 2025");
  });

  test("merges class names while deduping conflicts", () => {
    expect(cn("p-2 text-sm", false && "hidden", "text-base")).toBe(
      "p-2 text-base"
    );
  });
});
