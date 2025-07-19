import { expect, it } from "vitest";
import categorizeByTimePeriod from "../helpers/categorizeByTimePeriod";
import { GroupType } from "../helpers/organizedStocksInGroups";

it("should return a month name if type is month", () => {
  const date = new Date("2024-12-06");
  const result = categorizeByTimePeriod(GroupType.Month, date);
  expect(result).toBe("Dec");
});

it("should return a week number as string if type is week", () => {
  const date = new Date("2024-12-06");
  const result = categorizeByTimePeriod(GroupType.Week, date);
  expect(result).toBe("Week 49");
});
