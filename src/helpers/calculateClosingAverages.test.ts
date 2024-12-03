import calculateClosingAverages from "./calculateClosingAverages";
import { expect, it } from "vitest";

it("should return averages of closing prices", () => {
  const SIX_WEEKS_OF_STOCKS_LENGTH = 6;
  const FIVE_MONTHS_OF_STOCKS_LENGTH = 5;

  const sixWeeksOfStocks = [
    [
      { closingPrices: 237.33, date: "Week 48" },
      { closingPrices: 234.93, date: "Week 48" },
      { closingPrices: 235.06, date: "Week 48" },
    ],
    [
      { closingPrices: 232.87, date: "Week 47" },
      { closingPrices: 229.87, date: "Week 47" },
      { closingPrices: 228.52, date: "Week 47" },
      { closingPrices: 229, date: "Week 47" },
      { closingPrices: 228.28, date: "Week 47" },
    ],
    [
      { closingPrices: 228.02, date: "Week 46" },
      { closingPrices: 225, date: "Week 46" },
      { closingPrices: 228.22, date: "Week 46" },
      { closingPrices: 225.12, date: "Week 46" },
      { closingPrices: 224.23, date: "Week 46" },
    ],
    [
      { closingPrices: 224.23, date: "Week 45" },
      { closingPrices: 226.96, date: "Week 45" },
      { closingPrices: 227.48, date: "Week 45" },
      { closingPrices: 222.72, date: "Week 45" },
      { closingPrices: 223.45, date: "Week 45" },
    ],
    [
      { closingPrices: 222.01, date: "Week 44" },

      { closingPrices: 222.91, date: "Week 44" },

      { closingPrices: 225.91, date: "Week 44" },

      { closingPrices: 230.1, date: "Week 44" },

      { closingPrices: 233.67, date: "Week 44" },
    ],
    [
      { closingPrices: 233.4, date: "Week 43" },

      { closingPrices: 231.41, date: "Week 43" },

      { closingPrices: 230.57, date: "Week 43" },

      { closingPrices: 230.76, date: "Week 43" },

      { closingPrices: 235.86, date: "Week 43" },
    ],
  ];
  const sixWeeksPricesAverages = calculateClosingAverages(sixWeeksOfStocks);
  expect(sixWeeksPricesAverages).toHaveLength(SIX_WEEKS_OF_STOCKS_LENGTH);
  expect(sixWeeksPricesAverages).toStrictEqual([
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
  ]);

  const fiveMonthsOfStocks = [
    [
      { closingPrices: 237.33, date: "Nov" },
      { closingPrices: 234.93, date: "Nov" },
      { closingPrices: 235.06, date: "Nov" },
      { closingPrices: 232.87, date: "Nov" },
      { closingPrices: 229.87, date: "Nov" },
      { closingPrices: 228.52, date: "Nov" },
      { closingPrices: 229, date: "Nov" },
      { closingPrices: 228.28, date: "Nov" },
      { closingPrices: 228.02, date: "Nov" },
      { closingPrices: 225, date: "Nov" },
      { closingPrices: 228.22, date: "Nov" },
      { closingPrices: 225.12, date: "Nov" },
      { closingPrices: 224.23, date: "Nov" },
      { closingPrices: 224.23, date: "Nov" },
      { closingPrices: 226.96, date: "Nov" },
      { closingPrices: 227.48, date: "Nov" },
      { closingPrices: 222.72, date: "Nov" },
      { closingPrices: 223.45, date: "Nov" },
      { closingPrices: 222.01, date: "Nov" },
    ],
    [
      { closingPrices: 222.91, date: "Oct" },
      { closingPrices: 225.91, date: "Oct" },
      { closingPrices: 230.1, date: "Oct" },
      { closingPrices: 233.67, date: "Oct" },
      { closingPrices: 233.4, date: "Oct" },
      { closingPrices: 231.41, date: "Oct" },
      { closingPrices: 230.57, date: "Oct" },
      { closingPrices: 230.76, date: "Oct" },
      { closingPrices: 235.86, date: "Oct" },
      { closingPrices: 236.48, date: "Oct" },
      { closingPrices: 235, date: "Oct" },
      { closingPrices: 232.15, date: "Oct" },
      { closingPrices: 231.78, date: "Oct" },
      { closingPrices: 233.85, date: "Oct" },
      { closingPrices: 231.3, date: "Oct" },
      { closingPrices: 227.55, date: "Oct" },
      { closingPrices: 229.04, date: "Oct" },
      { closingPrices: 229.54, date: "Oct" },
      { closingPrices: 225.77, date: "Oct" },
      { closingPrices: 221.69, date: "Oct" },
      { closingPrices: 226.8, date: "Oct" },
      { closingPrices: 225.67, date: "Oct" },
      { closingPrices: 226.78, date: "Oct" },
    ],
    [
      { closingPrices: 226.21, date: "Sep" },
      { closingPrices: 233, date: "Sep" },
      { closingPrices: 227.79, date: "Sep" },
      { closingPrices: 227.52, date: "Sep" },
      { closingPrices: 226.37, date: "Sep" },
      { closingPrices: 227.37, date: "Sep" },
      { closingPrices: 226.47, date: "Sep" },
      { closingPrices: 228.2, date: "Sep" },
      { closingPrices: 228.87, date: "Sep" },
      { closingPrices: 220.69, date: "Sep" },
      { closingPrices: 216.79, date: "Sep" },
      { closingPrices: 216.32, date: "Sep" },
      { closingPrices: 222.5, date: "Sep" },
      { closingPrices: 222.77, date: "Sep" },
      { closingPrices: 222.66, date: "Sep" },
      { closingPrices: 220.11, date: "Sep" },
      { closingPrices: 220.91, date: "Sep" },
      { closingPrices: 220.82, date: "Sep" },
      { closingPrices: 222.38, date: "Sep" },
      { closingPrices: 220.85, date: "Sep" },
      { closingPrices: 222.77, date: "Sep" },
    ],
    [
      { closingPrices: 229, date: "Aug" },
      { closingPrices: 229.79, date: "Aug" },
      { closingPrices: 226.49, date: "Aug" },
      { closingPrices: 228.03, date: "Aug" },
      { closingPrices: 227.18, date: "Aug" },
      { closingPrices: 226.84, date: "Aug" },
      { closingPrices: 224.53, date: "Aug" },
      { closingPrices: 226.4, date: "Aug" },
      { closingPrices: 226.51, date: "Aug" },
      { closingPrices: 225.89, date: "Aug" },
      { closingPrices: 226.05, date: "Aug" },
      { closingPrices: 224.72, date: "Aug" },
      { closingPrices: 221.72, date: "Aug" },
      { closingPrices: 221.27, date: "Aug" },
      { closingPrices: 217.53, date: "Aug" },
      { closingPrices: 216.24, date: "Aug" },
      { closingPrices: 213.31, date: "Aug" },
      { closingPrices: 209.82, date: "Aug" },
      { closingPrices: 207.23, date: "Aug" },
      { closingPrices: 209.27, date: "Aug" },
      { closingPrices: 219.86, date: "Aug" },
    ],
    [
      { closingPrices: 218.36, date: "Jul" },
      { closingPrices: 222.08, date: "Jul" },
      { closingPrices: 218.8, date: "Jul" },
      { closingPrices: 218.24, date: "Jul" },
      { closingPrices: 217.96, date: "Jul" },
      { closingPrices: 217.49, date: "Jul" },
      { closingPrices: 218.54, date: "Jul" },
      { closingPrices: 225.01, date: "Jul" },
      { closingPrices: 223.96, date: "Jul" },
      { closingPrices: 224.31, date: "Jul" },
      { closingPrices: 224.18, date: "Jul" },
      { closingPrices: 228.88, date: "Jul" },
      { closingPrices: 234.82, date: "Jul" },
      { closingPrices: 234.4, date: "Jul" },
      { closingPrices: 230.54, date: "Jul" },
      { closingPrices: 227.57, date: "Jul" },
    ],
  ];

  const fiveMonthClosingPricesAverages =
    calculateClosingAverages(fiveMonthsOfStocks);
  expect(fiveMonthsOfStocks).toHaveLength(FIVE_MONTHS_OF_STOCKS_LENGTH);

  expect(fiveMonthClosingPricesAverages).toStrictEqual([
    {
      closingPrices: 228.06842105263158,
      date: "Nov",
    },
    {
      closingPrices: 229.9126086956522,
      date: "Oct",
    },
    {
      closingPrices: 223.87476190476195,
      date: "Sep",
    },
    {
      closingPrices: 221.79428571428568,
      date: "Aug",
    },
    {
      closingPrices: 224.07125000000002,
      date: "Jul",
    },
  ]);
});
