import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";
import { DailyStocksApiResponse } from "./stockApi";

export function getFiveMonthsStockData(stocksData: DailyStocksApiResponse) {
  const fiveMonthsDailyData = organizeStocksInGroups(
    GroupType.Month,
    5,
    stocksData
  );
  if (fiveMonthsDailyData) {
    return calculateClosingAverages(fiveMonthsDailyData);
  }
}
