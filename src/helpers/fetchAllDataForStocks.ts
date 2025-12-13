import axios from "axios";
import fetchQuote from "./fetchQuote";
import fetchHistoricalData from "./fetchHistoricalData";
import logError from "./logError";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchAllDataForStocks(stockSymbol: string) {
  try {
    const [detailsResponse, quote, dailyData] = await Promise.all([
      axios.get(
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
      ),
      fetchQuote(stockSymbol),
      fetchHistoricalData(stockSymbol),
    ]);

    const details = detailsResponse.data;
    if (!details || !quote || !dailyData) return null;
    return [details, quote, dailyData];
  } catch (error) {
    logError(error);
    return null;
  }
}
