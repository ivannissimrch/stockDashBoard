import { DailyStocksApiResponse } from "./stockApi";

export default function getStoredDataFromStorage() {
  const storedStockData = localStorage.getItem("storedStocksData");
  if (!storedStockData) {
    return null;
  }
  try {
    const stockDataFromStorage: DailyStocksApiResponse =
      JSON.parse(storedStockData);
    return stockDataFromStorage;
  } catch (error) {
    console.error("Error parsing data", error);
    return undefined;
  }
}
