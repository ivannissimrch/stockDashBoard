const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
import { fetchFinnhubStockData } from "./fetchFinnhubStockData";

export interface DailyMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface WelcomeDailyStocksApiResponse {
  "Meta Data": DailyMetaData;
  "Time Series (Daily)": { [key: string]: StockTimeSeries };
}
export interface DailyStocksApiResponse {
  [key: string]: StockTimeSeries;
}

export interface StocksData {
  closingPrices: number;
  date: string;
}

export async function fetchVantageStockData(
  symbol: string
): Promise<DailyStocksApiResponse | undefined> {
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
