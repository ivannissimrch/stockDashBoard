import { it, expect, vi } from "vitest";
import fetchVantageStockData from "./fetchVantageStockData";
import { afterEach } from "node:test";
import { MOCK_STOCK_DATA } from "./mockStoredStockData";

const mockFetch = vi.fn();
global.fetch = mockFetch;

afterEach(() => {
  mockFetch.mockReset();
});

it("should return parse data when successful", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: vi
      .fn()
      .mockResolvedValueOnce({ "Time Series (Daily)": MOCK_STOCK_DATA }),
  });

  const symbol = "AAPL";
  const data = await fetchVantageStockData(symbol);
  expect(data).toEqual(MOCK_STOCK_DATA);
});

it("should return undefined when response status is not ok", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    json: vi
      .fn()
      .mockResolvedValueOnce({ "Time Series (Daily)": MOCK_STOCK_DATA }),
  });
  const symbol = "AAPL";
  const data = await fetchVantageStockData(symbol);
  expect(data).toBeUndefined();
});
