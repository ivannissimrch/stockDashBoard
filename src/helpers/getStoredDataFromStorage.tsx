export default function getStoredDataFromStorage() {
  const storedStockData = localStorage.getItem("storedStocksData") as string;
  const stockDataFromStorage = JSON.parse(storedStockData);
  const storedSymbol = localStorage.getItem("storedStocksDataSymbol") as string;

  return [stockDataFromStorage, storedSymbol];
}
