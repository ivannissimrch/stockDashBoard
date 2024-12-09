import calculateClosingAverages from "./calculateClosingAverages";
import getStoredDataFromStorage from "./getStoredDataFromStorage";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export default function getSixWeeksStockData() {
  const stocksData = getStoredDataFromStorage();
  if (stocksData === undefined || stocksData === null) {
    return;
  }
  const sixWeeksDailyData = organizeStocksInGroups(
    GroupType.Week,
    6,
    stocksData
  );
  if (sixWeeksDailyData) {
    return calculateClosingAverages(sixWeeksDailyData);
  }
}
