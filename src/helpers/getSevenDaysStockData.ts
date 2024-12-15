import { DailyStocksApiResponse } from "./stockApi";

export default function getSevenDaysStockData(
  stocksData: DailyStocksApiResponse
) {
  const NUMBER_OF_DAYS = 7;
  const stockWithDateObjectsKeys = Object.keys(stocksData);
  const sevenDaysKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < NUMBER_OF_DAYS
  );
  const sevenDaysStocks = sevenDaysKeys.map((key) => {
    return {
      closingPrices: +stocksData[key]["4. close"],
      date: key,
    };
  });
  return sevenDaysStocks;
}
