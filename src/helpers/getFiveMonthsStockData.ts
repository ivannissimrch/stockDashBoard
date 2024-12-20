import calculateClosingAverages from "./calculateClosingAverages";
import { DailyStocksApiResponse } from "./fetchVantageStockData";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export default function getFiveMonthsStockData(
  stocksData: DailyStocksApiResponse
) {
  const fiveMonthsDailyData = organizeStocksInGroups(
    GroupType.Month,
    5,
    stocksData
  );
  if (fiveMonthsDailyData) {
    return calculateClosingAverages(fiveMonthsDailyData);
  }
}
