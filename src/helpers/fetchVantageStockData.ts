export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface DailyStocksApiResponse {
  [key: string]: StockTimeSeries;
}

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
export default async function fetchVantageStockData(
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
