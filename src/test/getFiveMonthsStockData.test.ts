import { expect, it } from "vitest";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import { MOCK_STOCK_DATA } from "../helpers/mockStoredStockData";

it("should return monthly closing price averages with correct structure", () => {
  const result = getFiveMonthsStockData(MOCK_STOCK_DATA);
  if (result) {
    expect(result).toHaveLength(5);

    result.forEach((monthData) => {
      expect(monthData).toHaveProperty("closingPrices");
      expect(monthData).toHaveProperty("date");
      expect(typeof monthData.closingPrices).toBe("number");
      expect(typeof monthData.date).toBe("string");
      expect(monthData.closingPrices).toBeGreaterThan(0);
    });
  }
});
