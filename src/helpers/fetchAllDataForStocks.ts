import axios from "axios";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export default async function fetchAllDataForStocks(stockSymbol: string) {
  const details = axios.get(
    `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
  );
  const quote = axios.get(
    `${FINNHUB_BASE_URL}/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
  );

  const dailyData = axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const results = await Promise.all([details, quote, dailyData]);
  const data = results.map((result) => {
    if ("Time Series (Daily)" in result.data) {
      return result.data["Time Series (Daily)"];
    }
    return result.data;
  });
  return data;
}
