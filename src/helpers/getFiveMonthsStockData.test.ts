import { expect, it } from "vitest";
import { getFiveMonthsStockData } from "./getFiveMonthsStockData";
import getStoredDataFromStorage from "./getStoredDataFromStorage";

it("Should return an array of objects with a length of six", () => {
  const dataStorage = getStoredDataFromStorage();
  if (dataStorage) {
    const fiveMonthsOfStocks = getFiveMonthsStockData();
    expect(fiveMonthsOfStocks).toHaveLength(5);
    fiveMonthsOfStocks?.forEach((monthOfStocks) => {
      expect(monthOfStocks).toHaveProperty("closingPrices");
      expect(monthOfStocks).toHaveProperty("date");
    });
  }
});
