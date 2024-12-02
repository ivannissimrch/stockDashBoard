import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export default function getSixWeeksStockData() {
  const sixWeeksDailyData = organizeStocksInGroups(GroupType.Week, 6);
  if (sixWeeksDailyData) {
    return calculateClosingAverages(sixWeeksDailyData);
  }
}
