import { StockDetails } from "../types";
import fetchFinnhubStockData from "./fetchFinnhubStockData";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchStockDetails(
  stockSymbol: string
): Promise<StockDetails | undefined> {
  const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  return await fetchFinnhubStockData(url);
}
