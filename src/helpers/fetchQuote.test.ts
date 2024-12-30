import { expect, it, vi } from "vitest";
import fetchQuote from "./fetchQuote";
import fetchFinnhubStockData from "./fetchFinnhubStockData";

vi.mock("./fetchFinnhubStockData", () => ({
  default: vi.fn(),
}));

const mockStockQuote = {
  c: 248.13,
  d: 0.17,
  dp: 0.0686,
  h: 249.2902,
  l: 246.24,
  o: 247.815,
  pc: 247.96,
  t: 1734123600,
};

it("should expect fethcFinnhubStockData to have been call", async () => {
  (fetchFinnhubStockData as any).mockResolvedValue(mockStockQuote);
  const userQuery = "apple";
  await fetchQuote(userQuery);
  expect(fetchFinnhubStockData).toHaveBeenCalled();
});

it("should return an object with the stock quote", async () => {
  (fetchFinnhubStockData as any).mockResolvedValue(mockStockQuote);
  const userQuery = "apple";
  const result = await fetchQuote(userQuery);
  expect(result).toEqual(mockStockQuote);
});
