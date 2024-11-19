import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { StocksData } from "./stockApi";

export function getFiveMonthsStockData(): StocksData[] {
  const fiveMonthsDailyData = organizeStocksInGroups("month", 5);
  return calculateClosingAverages(fiveMonthsDailyData);
}
