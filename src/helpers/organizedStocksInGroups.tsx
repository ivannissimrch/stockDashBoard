import getStoredDataFromStorage from "./getStoredDataFromStorage";
import { getWeekNumber } from "./getWeekNumber";
import { StocksData } from "./stockApi";

export default function organizeStocksInGroups(
  groupBy: string,
  lengthOfGroup: number
) {
  const [stockDataFromStorage] = getStoredDataFromStorage();
  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);

  const stockDataByGroup: { [key: string]: StocksData[] } = {};
  stockWithDateObjectsKeys.forEach((stockDate) => {
    const date = new Date(stockDate);

    let groupCategory = "";
    if (groupBy === "month") {
      groupCategory = date.toLocaleString("default", {
        month: "short",
      });
    } else {
      const [_unusedYear, calendarWeekNumber] = getWeekNumber(date);
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

  return groupsKeys.map((indexMonth) => stockDataByGroup[indexMonth]);
}
