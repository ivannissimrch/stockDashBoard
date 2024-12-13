const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
import { fetchFinnhubStockData } from "./fetchFinnhubStockData";

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

export default async function fetchQuote(
  stockSymbol: string
): Promise<StockQuote | undefined> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  console.log(await fetchFinnhubStockData<StockQuote>(url));
  return await fetchFinnhubStockData<StockQuote>(url);
}
