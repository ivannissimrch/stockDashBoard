import { expect, it } from "vitest";
import getSixWeeksStockData from "./getSixWeeksStockData";
import getStoredDataFromStorage from "./getStoredDataFromStorage";

it("Should return an array of objects with a length of six", () => {
  const dataStorage = getStoredDataFromStorage();
  if (dataStorage) {
    const sixWeeksOfStocks = getSixWeeksStockData();
    expect(sixWeeksOfStocks).toHaveLength(6);
    sixWeeksOfStocks?.forEach((weekOfStocks) => {
      expect(weekOfStocks).toHaveProperty("closingPrices");
      expect(weekOfStocks).toHaveProperty("date");
    });
  }
});
