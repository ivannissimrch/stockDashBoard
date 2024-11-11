const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

interface StockSymbols {
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

export interface DailyMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface WeekMonthMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
}

export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface DailyStocksApiResponse {
  "Meta Data": DailyMetaData;
  "Time Series (Daily)": { [key: string]: StockTimeSeries };
}

// export interface WeekMonthlySeries {
//   "1. open": string;
//   "2. high": string;
//   "3. low": string;
//   "4. close": string;
//   "5. volume": string;
// }

// export interface WeeklyStocksApiResponse {
//   "Meta Data": WeekMonthMetaData;
//   "Weekly Time Series": { [key: string]: StockTimeSeries };
// }

// export interface MonthlyStocksApiResponse {
//   "Meta Data": WeekMonthMetaData;
//   "Monthly Time Series": { [key: string]: StockTimeSeries };
// }

export interface StocksData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
  date: string;
}

async function fetchFinnhubStockData<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
}

export async function fetchStocksSymbols(
  userQuery: string
): Promise<StockSymbols[]> {
  const url = `${FINNHUB_BASE_URL}/search?q=${userQuery}&exchange=US&token=${FINNHUB_API_KEY}`;
  const results = await fetchFinnhubStockData<{ result: StockSymbols[] }>(url);
  if (!results) {
    return [];
  }
  return results.result;
}

export async function fetchStockDetails(
  stockSymbol: string
): Promise<StockDetails | undefined> {
  const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  return await fetchFinnhubStockData<StockDetails>(url);
}

export async function fetchQuote(
  stockSymbol: string
): Promise<StockQuote | undefined> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  return await fetchFinnhubStockData<StockQuote>(url);
}

export async function fetchVantageStockData(
  symbol: string
): Promise<{ [key: string]: StockTimeSeries } | undefined> {
  //is this type correct?
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;

      throw new Error(message);
    }
    const dailyStocksApiResponse = await response.json();
    return dailyStocksApiResponse["Time Series (Daily)"];
  } catch (error: unknown) {
    console.log(error);
  }
}
