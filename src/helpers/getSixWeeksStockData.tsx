import getStoredDataFromStorage from "./getStoredDataFromStorage";
import { getWeekNumber } from "./getWeekNumber";
import { StocksData } from "./stockApi";

export default function getSixWeeksStockData(): StocksData[] | undefined {
  const [parsedStoredStockData] = getStoredDataFromStorage();

  const stockWithDateObjectsKeys = Object.keys(parsedStoredStockData);
  //get four arrays per week of stocks data .
  const stockDataByWeek = {};
  stockWithDateObjectsKeys.forEach((dayDate) => {
    const dates = new Date(dayDate);
    const [_unusedYear, calendarWeekNumber] = getWeekNumber(dates);

    if (stockDataByWeek[`${calendarWeekNumber}`]) {
      if (Object.keys(stockDataByWeek).length > 6) {
        return;
      }
      stockDataByWeek[`${calendarWeekNumber}`].push({
        ...parsedStoredStockData?.[dayDate],
        date: calendarWeekNumber,
      });
    } else {
      stockDataByWeek[calendarWeekNumber] = [
        {
          ...parsedStoredStockData?.[dayDate],
          date: calendarWeekNumber,
        },
      ];
    }
  });

  //get sixWeeksStocks
  const validWeekKeys = Object.keys(stockDataByWeek).filter((stock) => {
    const lastSixWeeksNumbers = stockDataByWeek[`${stock}`].length > 2;
    return lastSixWeeksNumbers;
  });
  const SixWeeksStocks = validWeekKeys.map(
    (indexMonth) => stockDataByWeek[`${indexMonth}`]
  );

  //calculate six weeks of stocks close average
  const sixWeeksStocksData = SixWeeksStocks.map((sixWeeksData) => {
    const weekCloseAverages = sixWeeksData.reduce(
      (total, currentWeek) => {
        const closeValue = parseFloat(currentWeek["4. close"]);

        return {
          close: total?.close + closeValue,
          "4. close": (total?.close + closeValue) / sixWeeksData.length,
          date: `week ${currentWeek.date}`,
        };
      },
      { close: 0, closeAverages: 0, date: "", symbol: "" }
    );
    return weekCloseAverages;
  });

  //return six weeks stocks with the averages of closes
  return sixWeeksStocksData;
}
