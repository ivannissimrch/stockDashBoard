import axios from "axios";
import logError from "./logError";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

export default async function fetchHistoricalData(stockSymbol: string) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    // Alpha Vantage returns 200 even on rate limit, but without data
    // Check for their "Note" field which indicates rate limiting
    if (response.data["Note"]) {
      throw new Error(
        "API rate limit reached. Please wait a minute and try again."
      );
    }

    const dailyData = response.data["Time Series (Daily)"];

    if (!dailyData) {
      throw new Error("No historical data returned from API");
    }
    return dailyData;
  } catch (error) {
    logError(error);
    throw error;
  }
}
