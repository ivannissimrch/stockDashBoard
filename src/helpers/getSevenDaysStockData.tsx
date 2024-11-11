import { StocksData } from "./stockApi";
import getStoredDataFromStorage from "./getStoredDataFromStorage";

export default function getSevenDaysStockData() {
  //get data from local storage
  const SEVEN_DAYS = 7;
  const [stockDataFromStorage] = getStoredDataFromStorage();
  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);
  const sevenDaysKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < SEVEN_DAYS
  );
  const oneWeekStocks: StocksData[] = sevenDaysKeys.map((key) => {
    return {
      ...stockDataFromStorage?.[key],
      date: key,
    };
  });
  return oneWeekStocks;
}
