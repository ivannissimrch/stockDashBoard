const FINNHUB_API_KEY = "crf2qk1r01qk4jsaq0agcrf2qk1r01qk4jsaq0b0";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const ALPHA_VANTAGE_API_KEY = "G755KJ6M6HBI4UG7";

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

export interface TimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface DailyStocksApiResponse {
  "Meta Data": DailyMetaData;
  "Time Series (Daily)": { [key: string]: TimeSeries };
}

export interface WeekMonthlySeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface WeeklyStocksApiResponse {
  "Meta Data": WeekMonthMetaData;
  "Weekly Time Series": { [key: string]: TimeSeries };
}

export interface MonthlyStocksApiResponse {
  "Meta Data": WeekMonthMetaData;
  "Monthly Time Series": { [key: string]: TimeSeries };
}

export interface StocksData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
  date: string;
  symbol: string;
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
): Promise<ApiStockResults[]> {
  const url = `${FINNHUB_BASE_URL}/search?q=${userQuery}&exchange=US&token=${FINNHUB_API_KEY}`;
  const results = await fetchFinnhubStockData<{ result: ApiStockResults[] }>(
    url
  );
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

async function fetchVantageStocksData(
  url: string
): Promise<{ [key: string]: TimeSeries }> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function fetchDailyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  const results = await fetchVantageStocksData(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const stocksWithDatesObjects = results?.["Time Series (Daily)"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];
  const oneWeekKeys = stockWithDateObjectsKeys.filter((_stock, idx) => idx < 7);
  const oneWeekStocks: StocksData[] = oneWeekKeys.map((key) => {
    return {
      ...stocksWithDatesObjects?.[key],
      date: key,
      symbol: symbol,
    };
  });
  return oneWeekStocks;
}

export async function fetchWeeklyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  const results = await fetchVantageStocksData(
    `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const stocksWithDatesObjects = results?.["Weekly Time Series"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];
  const oneMonthKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < 4
  );
  const oneMonthStocks: StocksData[] = oneMonthKeys.map((key) => {
    return {
      ...stocksWithDatesObjects?.[key],
      date: key,
      symbol: symbol,
    };
  });
  return oneMonthStocks;
}

export async function fetchMonthlyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  const results = await fetchVantageStocksData(
    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const stocksWithDatesObjects = results?.["Monthly Time Series"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];
  const oneYearKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < 12
  );
  const oneYearStocks: StocksData[] = oneYearKeys.map((key) => {
    return {
      ...stocksWithDatesObjects?.[key],
      date: key,
      symbol: symbol,
    };
  });
  return oneYearStocks;
}
