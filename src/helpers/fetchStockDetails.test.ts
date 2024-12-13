import { expect, it, vi } from "vitest";
import { fetchFinnhubStockData } from "./fetchFinnhubStockData";
import fetchStockDetails from "./fetchStockDetails";

vi.mock("./fetchFinnhubStockData", () => ({
  fetchFinnhubStockData: vi.fn(),
}));

const mockStockDetails = {
  country: "US",
  currency: "USD",
  estimateCurrency: "USD",
  exchange: "NASDAQ NMS - GLOBAL MARKET",
  finnhubIndustry: "Technology",
  ipo: "1980-12-12",
  logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
  marketCapitalization: 3748119.614661203,
  name: "Apple Inc",
  phone: "14089961010",
  shareOutstanding: 15115.82,
  ticker: "AAPL",
  weburl: "https://www.apple.com/",
};

it("should expect fethcFinnhubStockData to have been call", async () => {
  (fetchFinnhubStockData as any).mockResolvedValue(mockStockDetails);
  const userQuery = "apple";
  const result = await fetchStockDetails(userQuery);
  expect(fetchFinnhubStockData).toHaveBeenCalled();
});

it("should return an object with the stock details", async () => {
  (fetchFinnhubStockData as any).mockResolvedValue(mockStockDetails);
  const userQuery = "apple";
  const result = await fetchStockDetails(userQuery);
  expect(result).toEqual(mockStockDetails);
});
