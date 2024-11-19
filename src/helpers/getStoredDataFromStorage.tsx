export default function getStoredDataFromStorage() {
  const storedStockData = localStorage.getItem("storedStocksData") as string;
  const stockDataFromStorage = JSON.parse(storedStockData);
  return stockDataFromStorage;
}
