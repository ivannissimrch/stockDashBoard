import { expect, it } from "vitest";
import organizeStocksInGroups, { GroupType } from "./organizedStocksInGroups";
import { MOCK_STOCK_DATA } from "./mockStoredStockData";

it("should return an array with 2 arrays of stocks organized by week", () => {
  const twoWeeksOfStocks = organizeStocksInGroups(
    GroupType.Week,
    2,
    MOCK_STOCK_DATA
  );

  expect(twoWeeksOfStocks).toStrictEqual([
    [
      { closingPrices: 227.41, date: "Week 48" },
      { closingPrices: 226.92, date: "Week 48" },
      { closingPrices: 228.83, date: "Week 48" },
    ],
    [
      { closingPrices: 226.13, date: "Week 47" },
      { closingPrices: 222.97, date: "Week 47" },
      { closingPrices: 222.4, date: "Week 47" },
      { closingPrices: 214.6, date: "Week 47" },
      { closingPrices: 210.25, date: "Week 47" },
    ],
  ]);
});

it("should return an array with 3 arrays of stocks organized by month", () => {
  const threeMonthsOfStocks = organizeStocksInGroups(
    GroupType.Month,
    3,
    MOCK_STOCK_DATA
  );

  expect(threeMonthsOfStocks).toStrictEqual([
    [
      { closingPrices: 227.41, date: "Nov" },
      { closingPrices: 226.92, date: "Nov" },
      { closingPrices: 228.83, date: "Nov" },
      { closingPrices: 226.13, date: "Nov" },
      { closingPrices: 222.97, date: "Nov" },
      { closingPrices: 222.4, date: "Nov" },
      { closingPrices: 214.6, date: "Nov" },
      { closingPrices: 210.25, date: "Nov" },
      { closingPrices: 208.09, date: "Nov" },
      { closingPrices: 204.99, date: "Nov" },
      { closingPrices: 208.99, date: "Nov" },
      { closingPrices: 210.92, date: "Nov" },
      { closingPrices: 210.86, date: "Nov" },
      { closingPrices: 213.57, date: "Nov" },
      { closingPrices: 213.72, date: "Nov" },
      { closingPrices: 213.69, date: "Nov" },
      { closingPrices: 213.6, date: "Nov" },
      { closingPrices: 207.57, date: "Nov" },
      { closingPrices: 206.32, date: "Nov" },
    ],
    [
      { closingPrices: 208.25, date: "Oct" },
      { closingPrices: 206.72, date: "Oct" },
      { closingPrices: 204.9, date: "Oct" },
      { closingPrices: 210.43, date: "Oct" },
      { closingPrices: 212.91, date: "Oct" },
      { closingPrices: 214.67, date: "Oct" },
      { closingPrices: 218.39, date: "Oct" },
      { closingPrices: 232.75, date: "Oct" },
      { closingPrices: 232.25, date: "Oct" },
      { closingPrices: 231.75, date: "Oct" },
      { closingPrices: 232.2, date: "Oct" },
      { closingPrices: 232.88, date: "Oct" },
      { closingPrices: 233.67, date: "Oct" },
      { closingPrices: 232.96, date: "Oct" },
      { closingPrices: 235.26, date: "Oct" },
      { closingPrices: 233.26, date: "Oct" },
      { closingPrices: 233.02, date: "Oct" },
      { closingPrices: 234.3, date: "Oct" },
      { closingPrices: 228.62, date: "Oct" },
      { closingPrices: 227.12, date: "Oct" },
      { closingPrices: 226, date: "Oct" },
      { closingPrices: 222.72, date: "Oct" },
      { closingPrices: 219.73, date: "Oct" },
    ],
    [
      { closingPrices: 219.35, date: "Sep" },
      { closingPrices: 221.08, date: "Sep" },
      { closingPrices: 220.84, date: "Sep" },
      { closingPrices: 223.43, date: "Sep" },
      { closingPrices: 221.23, date: "Sep" },
      { closingPrices: 220.97, date: "Sep" },
      { closingPrices: 220.5, date: "Sep" },
      { closingPrices: 217.7, date: "Sep" },
      { closingPrices: 213.89, date: "Sep" },
      { closingPrices: 214.94, date: "Sep" },
      { closingPrices: 214.13, date: "Sep" },
      { closingPrices: 217.16, date: "Sep" },
      { closingPrices: 214.79, date: "Sep" },
      { closingPrices: 211.61, date: "Sep" },
      { closingPrices: 209.89, date: "Sep" },
      { closingPrices: 205.32, date: "Sep" },
      { closingPrices: 203.53, date: "Sep" },
      { closingPrices: 200.74, date: "Sep" },
      { closingPrices: 202.59, date: "Sep" },
      { closingPrices: 204.11, date: "Sep" },
      { closingPrices: 201.28, date: "Sep" },
    ],
  ]);
});
