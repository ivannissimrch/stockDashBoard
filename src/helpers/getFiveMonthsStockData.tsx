import getStoredDataFromStorage from "./getStoredDataFromStorage";
import { StocksData, StockTimeSeries } from "./stockApi";

export function getFiveMonthsStockData(): StocksData[] {
  const [stockDataFromStorage] = getStoredDataFromStorage();
  const fiveMonthsDailyData = groupedStocksByMonth(stockDataFromStorage);
  return calculateFiveMonthsAverageData(fiveMonthsDailyData);
}

function groupedStocksByMonth(stockDataFromStorage: {
  [key: string]: StockTimeSeries;
}): StocksData[] {
  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);
  const FIVE_MONTHS = 5;
  //get five arrays, one per month of stocks data
  const stockDataByMonth: { [key: string]: StocksData[] } = {};
  stockWithDateObjectsKeys.forEach((dayDate) => {
    const dates = new Date(dayDate);
    const monthName = dates.toLocaleString("default", {
      month: "short",
    });

    if (stockDataByMonth[`${monthName}`]) {
      if (Object.keys(stockDataByMonth).length > FIVE_MONTHS) {
        return;
      }
      stockDataByMonth[`${monthName}`].push({
        ...stockDataFromStorage?.[dayDate],
        date: monthName,
      });
    } else {
      stockDataByMonth[monthName] = [
        {
          ...stockDataFromStorage?.[dayDate],
          date: monthName,
        },
      ];
    }
  });

  const fiveMonthsKeys = Object.keys(stockDataByMonth).filter(
    (month) => stockDataByMonth[month].length > 2
  );

  return fiveMonthsKeys.map((indexMonth) => stockDataByMonth[indexMonth]);
}

function calculateFiveMonthsAverageData(fiveMonthsDailyData: StocksData[][]) {
  const fiveMonthAveragesData = fiveMonthsDailyData.map((monthArray) => {
    const combinedMonthData = monthArray.reduce(
      (total, currentMonth) => {
        const closeValue = parseFloat(currentMonth["4. close"]);

        return {
          close: total?.close + closeValue,
          "4. close": (total?.close + closeValue) / monthArray.length,
          date: currentMonth.date,
        };
      },
      { close: 0, "4. close": 0, date: "" }
    );
    return combinedMonthData;
  });
  return fiveMonthAveragesData;
}
