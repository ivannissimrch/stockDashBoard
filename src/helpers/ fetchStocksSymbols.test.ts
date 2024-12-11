import { expect, it, vi } from "vitest";
import { fetchFinnhubStockData } from "./fetchFinnhubStockData";
import fetchStocksSymbols from "./fetchStocksSymbols";

vi.mock("./fetchFinnhubStockData", () => ({
  fetchFinnhubStockData: vi.fn(),
}));

const mockStockSymbols = [
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
    description: "APPLIED ENERGETICS INC",
    displaySymbol: "AERG",
    symbol: "AERG",
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
    description: "MAN GROUP PLC/JERSEY",
    displaySymbol: "MNGPF",
    symbol: "MNGPF",
    type: "Common Stock",
  },
  {
    description: "APPLIED DIGITAL CORP",
    displaySymbol: "APLD",
    symbol: "APLD",
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
];

it("should return a list of stock symbols", async () => {
  (fetchFinnhubStockData as any).mockResolvedValue({
    count: 17,
    result: mockStockSymbols,
  });

  const userQuery = "apple";
  const result = await fetchStocksSymbols(userQuery);
  console.log(result);
  expect(result).toEqual(mockStockSymbols);
});
