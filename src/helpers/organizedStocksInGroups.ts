import categorizeByTimePeriod from "./categorizeByTimePeriod";
import { StocksData } from "../App";
import { DailyStocksApiResponse } from "./fetchVantageStockData";

export enum GroupType {
  Month = "month",
  Week = "week",
}

export default function organizeStocksInGroups(
  groupBy: GroupType,
  maxNumberOfGroups: number,
  stockDataFromStorage: DailyStocksApiResponse
) {
  const stockDataByGroup: { [key: string]: StocksData[] } = {};

  for (const stockDateLabel of Object.keys(stockDataFromStorage)) {
    const date = new Date(stockDateLabel);
    const timePeriodLabel = categorizeByTimePeriod(groupBy, date);

    const closingPrices = parseFloat(
      stockDataFromStorage[stockDateLabel]["4. close"]
    );
    stockDataByGroup[timePeriodLabel] = stockDataByGroup[timePeriodLabel] || [];
    stockDataByGroup[timePeriodLabel].push({
      closingPrices: closingPrices,
      date: timePeriodLabel,
    });

    if (Object.keys(stockDataByGroup).length > maxNumberOfGroups) {
      break;
    }
  }

  return Object.values(stockDataByGroup).filter((group) => group.length > 2);
}
