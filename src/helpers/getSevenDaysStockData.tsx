import { StocksData } from "./stockApi";
import getStoredDataFromStorage from "./getStoredDataFromStorage";

export default function getSevenDaysStockData() {
  const NUMBER_OF_DAYS = 7;
  const [stockDataFromStorage] = getStoredDataFromStorage();
  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);
  const sevenDaysKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < NUMBER_OF_DAYS
  );
  const sevenDaysStocks: StocksData[] = sevenDaysKeys.map((key) => {
    return {
      closingPrices: stockDataFromStorage[key]["4. close"],
      date: key,
    };
  });
  return sevenDaysStocks;
}
