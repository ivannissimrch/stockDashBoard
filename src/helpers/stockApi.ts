const apiKey = "crf2qk1r01qk4jsaq0agcrf2qk1r01qk4jsaq0b0";
const basePath = "https://finnhub.io/api/v1";

type ApiStockResultsType = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export type StockDetailsType = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

export type StockQuoteType = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};
export async function fetchStocksSymbols(
  userQuery: string
): Promise<ApiStockResultsType[]> {
  try {
    const url = `${basePath}/search?q=${userQuery}&exchange=US&token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results.result;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export async function fetchStockDetails(
  stockSymbol: string
): Promise<StockDetailsType | undefined> {
  try {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function fetchQuote(
  stockSymbol: string
): Promise<StockQuoteType | undefined> {
  try {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
  }
}
