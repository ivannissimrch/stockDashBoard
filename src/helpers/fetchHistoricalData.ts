import axios from "axios";
import logError from "./logError";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export default async function fetchHistoricalData(stockSymbol: string) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const dailyData = response.data["Time Series (Daily)"];

    if (!dailyData) {
      return null;
    }
    return dailyData;
  } catch (error) {
    logError(error);
    return null;
  }
}
