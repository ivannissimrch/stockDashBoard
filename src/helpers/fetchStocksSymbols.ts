import axios from "axios";
import logError from "./logError";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchStocksSymbols(userQuery: string) {
  if (!userQuery || userQuery.length < 2) {
    return [];
  }

  try {
    const url = `${FINNHUB_BASE_URL}/search?q=${userQuery}&exchange=US&token=${FINNHUB_API_KEY}`;
    const results = await axios.get(url);
    if (!results.data.result) {
      return [];
    }
    return results.data.result;
  } catch (error) {
    logError(error);
    throw error;
  }
}
