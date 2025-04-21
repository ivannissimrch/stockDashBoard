import axios from "axios";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchStocksSymbols(userQuery: string) {
  const url = `${FINNHUB_BASE_URL}/search?q=${userQuery}&exchange=US&token=${FINNHUB_API_KEY}`;
  const results = await axios.get(url);

  if (!results) {
    return [];
  }
  return results.data.result;
}
