import axios from "axios";
import logError from "./logError";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchQuote(stockSymbol: string) {
  try {
    const quote = await axios.get(
      `${FINNHUB_BASE_URL}/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
    );
    if (!quote.data) {
      throw new Error("No quote data returned from API");
    }
    return quote.data;
  } catch (error) {
    logError(error);
    throw error;
  }
}
