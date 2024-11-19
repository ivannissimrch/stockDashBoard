import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { StocksData } from "./stockApi";

export default function getSixWeeksStockData(): StocksData[] {
  const sixWeeksDailyData = organizeStocksInGroups("week", 6);
  return calculateClosingAverages(sixWeeksDailyData);
}
