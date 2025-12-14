import axios from "axios";
import fetchQuote from "./fetchQuote";
import fetchHistoricalData from "./fetchHistoricalData";
import logError from "./logError";
import getErrorMessage from "./getErrorMessage";
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

export default async function fetchAllDataForStocks(stockSymbol: string) {
  const results = await Promise.allSettled([
    axios.get(
      `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`
    ),
    fetchQuote(stockSymbol),
    fetchHistoricalData(stockSymbol),
  ]);

  const [detailsResult, quoteResult, historicalResult] = results;

  // Collect errors from failed requests
  const errors: string[] = [];

  if (detailsResult.status === "rejected") {
    logError(detailsResult.reason);
    errors.push("stock details");
  }

  if (quoteResult.status === "rejected") {
    logError(quoteResult.reason);
    errors.push("price quote");
  }

  if (historicalResult.status === "rejected") {
    logError(historicalResult.reason);
    errors.push("historical data");
  }

  // If any failed, throw with specific info about what failed
  if (errors.length > 0) {
    const allErrorObjects = [
      detailsResult.status === "rejected" ? detailsResult.reason : null,
      quoteResult.status === "rejected" ? quoteResult.reason : null,
      historicalResult.status === "rejected" ? historicalResult.reason : null,
    ].filter(Boolean);

    // Check if ANY error is a rate limit
    const hasRateLimit = allErrorObjects.some((err) => {
      const message = getErrorMessage(err);
      return message.includes("rate limit");
    });

    // Rate limit is most helpful message - show it if found
    if (hasRateLimit) {
      throw new Error(
        "API rate limit reached. Please wait a minute and try again."
      );
    }

    throw new Error(`Failed to load ${errors.join(", ")}. Please try again.`);
  }

  // All succeeded - extract values
  const details =
    detailsResult.status === "fulfilled" ? detailsResult.value.data : null;
  const quote = quoteResult.status === "fulfilled" ? quoteResult.value : null;
  const dailyData =
    historicalResult.status === "fulfilled" ? historicalResult.value : null;

  if (!details || !quote || !dailyData) {
    throw new Error("No data found for this stock symbol.");
  }

  return [details, quote, dailyData];
}
