import { useEffect } from "react";
import { RecentlySeenStocks } from "../types";
import fetchHistoricalData from "../helpers/fetchHistoricalData";
import fetchQuote from "../helpers/fetchQuote";
import { useRecentlySeenStocksContext } from "../contexts/RecentlySeenStocksContext";
import logError from "../helpers/logError";

export default function useAutoUpdate(currentStock: RecentlySeenStocks) {
  const { updateRecentlySeenStocks } = useRecentlySeenStocksContext();
  useEffect(() => {
    if (!currentStock) {
      return;
    }

    const todaysDate = new Date().toISOString().split("T")[0];
    const intervalId = setInterval(() => {
      if (todaysDate !== currentStock.historicalDataLastUpdate) {
        //update historical data and date of historical data
        fetchHistoricalData(currentStock.stockOverview.symbol)
          .then((updateStockHistoricalData) => {
            if (!updateStockHistoricalData) return;
            const updatedStock = {
              ...currentStock,
              stockData: updateStockHistoricalData,
              historicalDataLastUpdate: todaysDate,
            };
            updateRecentlySeenStocks(updatedStock);
          })
          .catch((error) => logError(error));
      }

      const timeDifferenceInMinutes =
        (Date.now() - currentStock.lastUpdated) / (1000 * 60);
      //time hours and minutes
      const quoteLastUpdate = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (timeDifferenceInMinutes > 15) {
        fetchQuote(currentStock.stockOverview.symbol)
          .then((data) => {
            if (!data) return;
            const updatedStock = {
              ...currentStock,
              lastUpdated: Date.now(),
              quoteLastUpdate: quoteLastUpdate,
              stockOverview: {
                ...currentStock.stockOverview,
                price: data.c,
                changePercent: data.dp,
              },
            };
            updateRecentlySeenStocks(updatedStock);
          })
          .catch((error) => logError(error));
      }
    }, 30000); //repeat every 30 seconds
    return () => {
      clearInterval(intervalId);
    };
  }, [currentStock, updateRecentlySeenStocks]);
}
