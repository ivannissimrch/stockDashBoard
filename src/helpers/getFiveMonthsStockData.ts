import { StocksData } from "../types";
import calculateClosingAverages from "./calculateClosingAverages";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";

export default function getFiveMonthsStockData(stocksData: StocksData[]) {
  const fiveMonthsDailyData = organizeStocksInGroups(
    GroupType.Month,
    5,
    stocksData
  );
  if (fiveMonthsDailyData) {
    return calculateClosingAverages(fiveMonthsDailyData);
  }
}
