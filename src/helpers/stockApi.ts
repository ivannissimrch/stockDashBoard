const apiKey = "crf2qk1r01qk4jsaq0agcrf2qk1r01qk4jsaq0b0";
const basePath = "https://finnhub.io/api/v1";

interface ApiStockResults {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface StockDetails {
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
}

export interface StockQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface Welcome {
  "Meta Data": MetaData;
  "Time Series (Daily)": { [key: string]: TimeSeriesDaily };
}

export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": Date;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface TimeSeriesDaily {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export async function fetchStocksSymbols(
  userQuery: string
): Promise<ApiStockResults[]> {
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
): Promise<StockDetails | undefined> {
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
): Promise<StockQuote | undefined> {
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

export async function fetchDailyHistoricalData(
  symbol: string
): Promise<Welcome | undefined> {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=G755KJ6M6HBI4UG7`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results: Welcome = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function fetchMonthlyHistoricalData(
  symbol: string
): Promise<Welcome | undefined> {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=G755KJ6M6HBI4UG7`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results: Welcome = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
  }
}
