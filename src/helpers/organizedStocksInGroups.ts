import getStoredDataFromStorage from "./getStoredDataFromStorage";
import { weekNumber } from "weeknumber";
import { StocksData } from "./stockApi";

export enum GroupType {
  Month = "month",
  Week = "week",
}

export default function organizeStocksInGroups(
  groupBy: GroupType,
  lengthOfGroup: number
) {
  const stockDataFromStorage = getStoredDataFromStorage();
  if (stockDataFromStorage === undefined || stockDataFromStorage === null) {
    console.log("No valid stock data storage");
    return;
  }

  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);

  const stockDataByGroup: { [key: string]: StocksData[] } = {};
  stockWithDateObjectsKeys.forEach((stockDate) => {
    const date = new Date(stockDate);

    let groupCategory = "";
    if (groupBy === GroupType.Month) {
      groupCategory = date.toLocaleString("default", {
        month: "short",
      });
    }
    if (groupBy === GroupType.Week) {
      const calendarWeekNumber: number = weekNumber(date);
      groupCategory = `Week ${calendarWeekNumber}`;
    }

    if (stockDataByGroup[`${groupCategory}`]) {
      if (Object.keys(stockDataByGroup).length > lengthOfGroup) {
        return;
      }

      stockDataByGroup[`${groupCategory}`].push({
        closingPrices: parseFloat(stockDataFromStorage[stockDate]["4. close"]),
        date: groupCategory,
      });
    } else {
      stockDataByGroup[groupCategory] = [
        {
          closingPrices: parseFloat(
            stockDataFromStorage[stockDate]["4. close"]
          ),
          date: groupCategory,
        },
      ];
    }
  });

  const groupsKeys = Object.keys(stockDataByGroup).filter(
    (month) => stockDataByGroup[month].length > 2
  );

  console.log(groupsKeys.map((indexMonth) => stockDataByGroup[indexMonth]));

  return groupsKeys.map((indexMonth) => stockDataByGroup[indexMonth]);
}
