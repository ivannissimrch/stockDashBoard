import getStoredDataFromStorage from "./getStoredDataFromStorage";

export default function getSevenDaysStockData() {
  const NUMBER_OF_DAYS = 7;
  const stockDataFromStorage = getStoredDataFromStorage();
  if (stockDataFromStorage === undefined || stockDataFromStorage === null) {
    return;
  }
  const stockWithDateObjectsKeys = Object.keys(stockDataFromStorage);
  const sevenDaysKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < NUMBER_OF_DAYS
  );
  const sevenDaysStocks = sevenDaysKeys.map((key) => {
    return {
      closingPrices: stockDataFromStorage[key]["4. close"],
      date: key,
    };
  });
  return sevenDaysStocks;
}
