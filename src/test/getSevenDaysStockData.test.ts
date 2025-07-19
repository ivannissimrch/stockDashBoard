import { expect, it } from "vitest";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import { MOCK_STOCK_DATA } from "../helpers/mockStoredStockData";

it("should return an array of seven days stocks", () => {
  const sevenDaysOfStocks = getSevenDaysStockData(MOCK_STOCK_DATA);
  if (sevenDaysOfStocks) {
    expect(sevenDaysOfStocks).toHaveLength(7);

    expect(sevenDaysOfStocks).toEqual([
      { closingPrices: 227.41, date: "2024-11-29" },
      { closingPrices: 226.92, date: "2024-11-27" },
      { closingPrices: 228.83, date: "2024-11-26" },
      { closingPrices: 226.13, date: "2024-11-25" },
      { closingPrices: 222.97, date: "2024-11-22" },
      { closingPrices: 222.4, date: "2024-11-21" },
      { closingPrices: 214.6, date: "2024-11-20" },
    ]);

    sevenDaysOfStocks.forEach((stock) => {
      expect(stock).toHaveProperty("closingPrices");
      expect(stock).toHaveProperty("date");
      expect(typeof stock.closingPrices).toBe("number");
      expect(typeof stock.date).toBe("string");
      expect(stock.closingPrices).toBeGreaterThan(0);
    });
  }
});
