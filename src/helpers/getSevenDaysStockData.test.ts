import { expect, it } from "vitest";
import getSevenDaysStockData from "./getSevenDaysStockData";

it("should return an array of seven days stocks", () => {
  const sevenDaysOfStocks = getSevenDaysStockData();
  if (sevenDaysOfStocks) {
    expect(sevenDaysOfStocks).toHaveLength(7);
    expect(sevenDaysOfStocks).toEqual([
      { closingPrices: "238.0400", date: "2024-12-06" },
      { closingPrices: "234.7500", date: "2024-12-05" },
      { closingPrices: "233.4900", date: "2024-12-04" },
      { closingPrices: "229.0000", date: "2024-12-03" },
      { closingPrices: "227.3900", date: "2024-12-02" },
      { closingPrices: "227.4100", date: "2024-11-29" },
      { closingPrices: "226.9200", date: "2024-11-27" },
    ]);
  }
});
