import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";
import { DailyStocksApiResponse } from "./stockApi";

export default function getSixWeeksStockData(
  stocksData: DailyStocksApiResponse
) {
  const sixWeeksDailyData = organizeStocksInGroups(
    GroupType.Week,
    6,
    stocksData
  );
  if (sixWeeksDailyData) {
    return calculateClosingAverages(sixWeeksDailyData);
  }
}
