export interface DailyMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface WelcomeDailyStocksApiResponse {
  "Meta Data": DailyMetaData;
  "Time Series (Daily)": { [key: string]: StockTimeSeries };
}

export interface StocksData {
  closingPrices: number;
  date: string;
}
