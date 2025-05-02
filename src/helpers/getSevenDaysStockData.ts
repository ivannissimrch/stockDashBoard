import { StocksData } from "../types";

export default function getSevenDaysStockData(stocksData: StocksData[]) {
  const NUMBER_OF_DAYS = 7;
  const stockWithDateObjectsKeys = Object.keys(stocksData);
  const sevenDaysKeys = stockWithDateObjectsKeys.filter(
    (_stock, idx) => idx < NUMBER_OF_DAYS
  );
  const sevenDaysStocks = sevenDaysKeys.map((key: string) => {
    return {
      closingPrices: +stocksData[key]["4. close"],
      date: key,
    };
  });
  return sevenDaysStocks;
}
