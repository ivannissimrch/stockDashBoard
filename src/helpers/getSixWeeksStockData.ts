import { StocksData } from "../types";
import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export default function getSixWeeksStockData(stocksData: StocksData[]) {
  const sixWeeksDailyData = organizeStocksInGroups(
    GroupType.Week,
    6,
    stocksData
  );
  if (sixWeeksDailyData) {
    return calculateClosingAverages(sixWeeksDailyData);
  }
}
