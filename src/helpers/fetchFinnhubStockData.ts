import { StockSymbols } from "./fetchStocksSymbols";
import { StockDetails } from "./fetchStockDetails";
import { StockQuote } from "./fetchQuote";

export default async function fetchFinnhubStockData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results: StockSymbols | StockDetails | StockQuote | undefined =
      await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
}
