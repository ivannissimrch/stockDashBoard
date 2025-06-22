//delete?
import axios from "axios";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export default async function fetchHistoricalData(stockSymbol: string) {
  const dailyData = axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const results = await dailyData;
  console.log(results);

  return results.data["Time Series (Daily)"];
}
