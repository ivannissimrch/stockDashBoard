import calculateClosingAverages from "./calculateClosingAverages";
import { expect, it } from "vitest";

it("should return averages of closing prices", () => {
  interface DailyStocks {
    closingPrices: number;
    date: string;
  }
  const SIX_WEEKS_OF_STOCKS_LENGTH = 6;
  const FIVE_MONTHS_OF_STOCKS_LENGTH = 5;

  const oneFullWeekDailyStocks = [
    { closingPrices: 1, date: "date 1" },

    { closingPrices: 2, date: "date 1" },

    { closingPrices: 3, date: "date 1" },

    { closingPrices: 4, date: "date 1" },

    { closingPrices: 5, date: "date 1" },
  ];
  const oneMonthOfDailyStocks = [
    ...oneFullWeekDailyStocks,
    ...oneFullWeekDailyStocks,
    ...oneFullWeekDailyStocks,
    ...oneFullWeekDailyStocks,
  ];
  const onePartialWeekDailyStocks = [
    { closingPrices: 1, date: "date 1" },

    { closingPrices: 2, date: "date 1" },

    { closingPrices: 3, date: "date 1" },

    { closingPrices: 4, date: "date 1" },
  ];
  const sixWeeksOfDailyStocks = [
    oneFullWeekDailyStocks,
    oneFullWeekDailyStocks,
    oneFullWeekDailyStocks,
    oneFullWeekDailyStocks,
    oneFullWeekDailyStocks,
    onePartialWeekDailyStocks,
  ];

  const fiveMonthsOfDailyStocks = [
    oneMonthOfDailyStocks,
    oneMonthOfDailyStocks,
    oneMonthOfDailyStocks,
    oneMonthOfDailyStocks,
    oneMonthOfDailyStocks,
  ];

  const fiveWeeksPricesAverages = calculateClosingAverages(
    sixWeeksOfDailyStocks
  );
  expect(fiveWeeksPricesAverages).toHaveLength(SIX_WEEKS_OF_STOCKS_LENGTH);
  expect(fiveWeeksPricesAverages).toStrictEqual([
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 2.5,
      date: "date 1",
    },
  ]);

  const monthClosingPricesAverages = calculateClosingAverages(
    fiveMonthsOfDailyStocks
  );
  expect(fiveMonthsOfDailyStocks).toHaveLength(FIVE_MONTHS_OF_STOCKS_LENGTH);

  expect(monthClosingPricesAverages).toStrictEqual([
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
    {
      closingPrices: 3,
      date: "date 1",
    },
  ]);
});
