import { expect, it } from "vitest";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import { MOCK_STOCK_DATA } from "../helpers/mockStoredStockData";

const mockedSixWeeksOfClosingAverages = [
  {
    closingPrices: 227.72,
    date: "Week 48",
  },
  {
    closingPrices: 219.26999999999998,
    date: "Week 47",
  },
  {
    closingPrices: 208.76999999999998,
    date: "Week 46",
  },
  {
    closingPrices: 212.43,
    date: "Week 45",
  },
  {
    closingPrices: 207.32399999999998,
    date: "Week 44",
  },
  {
    closingPrices: 222.19400000000002,
    date: "Week 43",
  },
];

it("Should return an array of objects with closing averages organize by week", () => {
  const result = getSixWeeksStockData(MOCK_STOCK_DATA);
  if (result) {
    expect(result).toHaveLength(6);
    result.forEach((weekData, index) => {
      expect(weekData.date).toBe(mockedSixWeeksOfClosingAverages[index].date);
    });
  }
});
