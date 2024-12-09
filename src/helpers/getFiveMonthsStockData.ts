import calculateClosingAverages from "./calculateClosingAverages";
import getStoredDataFromStorage from "./getStoredDataFromStorage";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export function getFiveMonthsStockData() {
  const stocksData = getStoredDataFromStorage();
  if (stocksData === undefined || stocksData === null) {
    return;
  }
  const fiveMonthsDailyData = organizeStocksInGroups(
    GroupType.Month,
    5,
    stocksData
  );
  if (fiveMonthsDailyData) {
    return calculateClosingAverages(fiveMonthsDailyData);
  }
}
