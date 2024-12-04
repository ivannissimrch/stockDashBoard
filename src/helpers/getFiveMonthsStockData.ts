import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export function getFiveMonthsStockData() {
  const fiveMonthsDailyData = organizeStocksInGroups(GroupType.Month, 5);
  if (fiveMonthsDailyData) {
    return calculateClosingAverages(fiveMonthsDailyData);
  }
}
