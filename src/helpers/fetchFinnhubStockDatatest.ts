import { it, expect, vi } from "vitest";
import fetchFinnhubStockData from "./fetchFinnhubStockData";
import { afterEach } from "node:test";

const mockFetch = vi.fn();
global.fetch = mockFetch;

afterEach(() => {
  mockFetch.mockReset();
});

const mockResponseSymbol = [
  {
    description: "APPLE INC",
    displaySymbol: "AAPL",
    symbol: "AAPL",
    type: "Common Stock",
  },
  {
    description: "APPLIED UV INC",
    displaySymbol: "AUVIQ",
    symbol: "AUVIQ",
    type: "Common Stock",
  },
  {
    description: "APPLIED MATERIALS INC",
    displaySymbol: "AMAT",
    symbol: "AMAT",
    type: "Common Stock",
  },
  {
    description: "Applied UV Inc",
    displaySymbol: "AUVPQ",
    symbol: "AUVPQ",
    type: "",
  },
  {
    description: "APPULSE CORP",
    displaySymbol: "APULF",
    symbol: "APULF",
    type: "Common Stock",
  },
  {
    description: "APPLIQATE INC",
    displaySymbol: "APQT",
    symbol: "APQT",
    type: "Common Stock",
  },
  {
    description: "PINEAPPLE INC",
    displaySymbol: "PNPL",
    symbol: "PNPL",
    type: "Common Stock",
  },
  {
    description: "SINGULAR PEOPLE",
    displaySymbol: "SNGLF",
    symbol: "SNGLF",
    type: "Common Stock",
  },
  {
    description: "APPLE RUSH CO INC",
    displaySymbol: "APRU",
    symbol: "APRU",
    type: "Common Stock",
  },
  {
    description: "APPLUS SERVICES SA",
    displaySymbol: "APLUF",
    symbol: "APLUF",
    type: "Common Stock",
  },
  {
    description: "SAGE GROUP PLC/THE",
    displaySymbol: "SGGEF",
    symbol: "SGGEF",
    type: "Common Stock",
  },
  {
    description: "CAP GROUP GLOBAL EQ",
    displaySymbol: "CGGE",
    symbol: "CGGE",
    type: "ETP",
  },
  {
    description: "APPLIED DIGITAL CORP",
    displaySymbol: "APLD",
    symbol: "APLD",
    type: "Common Stock",
  },
  {
    description: "MAN GROUP PLC/JERSEY",
    displaySymbol: "MNGPF",
    symbol: "MNGPF",
    type: "Common Stock",
  },
  {
    description: "PEMBINA PIPELINE CORP",
    displaySymbol: "PBA",
    symbol: "PBA",
    type: "Common Stock",
  },
  {
    description: "CAP GROUP INTL EQUITY",
    displaySymbol: "CGIE",
    symbol: "CGIE",
    type: "ETP",
  },
  {
    description: "COMMODORE APPLIED TECH",
    displaySymbol: "CXIA",
    symbol: "CXIA",
    type: "Common Stock",
  },
];
const mockResponseDetails = {
  country: "US",
  currency: "USD",
  estimateCurrency: "USD",
  exchange: "NASDAQ NMS - GLOBAL MARKET",
  finnhubIndustry: "Technology",
  ipo: "1980-12-12",
  logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
  marketCapitalization: 3750689.322638749,
  name: "Apple Inc",
  phone: "14089961010",
  shareOutstanding: 15115.82,
  ticker: "AAPL",
  weburl: "https://www.apple.com/",
};
const mockResponseQuote = {
  c: 248.13,
  d: 0.17,
  dp: 0.0686,
  h: 249.2902,
  l: 246.24,
  o: 247.815,
  pc: 247.96,
  t: 1734210000,
};

it("should return parse data when successful", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: vi.fn().mockResolvedValueOnce(mockResponseSymbol),
  });

  const urlGetSymbol = "https://finnhub.io/api/v1/getQuote";
  const data = await fetchFinnhubStockData(urlGetSymbol);
  expect(data).toEqual(mockResponseSymbol);
});

it("should return undefined when response status is not ok", async () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    json: vi.fn().mockResolvedValueOnce(mockResponseSymbol),
  });
  const urlGetSymbol = "https://finnhub.io/api/v1/getQuote";
  const data = await fetchFinnhubStockData(urlGetSymbol);
  expect(data).toBeUndefined();
});
