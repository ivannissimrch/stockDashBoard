import axios from "axios";

export default function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    // Rate limit - happens often with Finnhub/Alpha Vantage free tier
    if (status === 429) {
      return "API rate limit reached. Please wait a minute and try again.";
    }

    // Unauthorized - bad API key
    if (status === 401 || status === 403) {
      return "API authentication failed. Check your API key.";
    }

    // Server error - not our fault
    if (status && status >= 500) {
      return "Stock service is temporarily unavailable. Try again later.";
    }

    // Network error - no internet or server unreachable
    if (error.code === "ERR_NETWORK") {
      return "Network error. Check your internet connection.";
    }

    // Timeout
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }

    // Generic axios error with message
    if (error.message) {
      return `Failed to fetch stock data: ${error.message}`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}
