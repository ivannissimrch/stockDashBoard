import { expect, it } from "vitest";
import getSixWeeksStockData from "./getSixWeeksStockData";

const mockedSixWeeksOfClosingAverages = [
  {
    closingPrices: 235.7733333333333,
    date: "Week 48",
  },
  {
    closingPrices: 229.708,
    date: "Week 47",
  },
  {
    closingPrices: 226.118,
    date: "Week 46",
  },
  {
    closingPrices: 224.968,
    date: "Week 45",
  },
  {
    closingPrices: 226.92,
    date: "Week 44",
  },
  {
    closingPrices: 232.4,
    date: "Week 43",
  },
];

it("Should return an array of objects with closing averages organize by week", () => {
  const result = getSixWeeksStockData();
  if (result) {
    expect(result).toHaveLength(6);
    expect(result).toEqual(mockedSixWeeksOfClosingAverages);
  }
});
