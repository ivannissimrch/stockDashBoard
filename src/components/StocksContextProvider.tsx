import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextTypes, RecentlySeenStocks, StocksData } from "../types";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import { usePersistedState } from "../hooks/usePersistedState";
import { getItem } from "../helpers/localStorage";
import fetchQuote from "../helpers/fetchQuote";
import fetchHistoricalData from "../helpers/fetchHistoricalData";

export const stocksContext = createContext<ContextTypes>({
  primaryColors: "primary_light_mode_colors",
  secondaryColors: "secondary_light_mode_colors",
  accentColors: "accent_light_mode_colors",
  iconColors: "icon_light_mode_colors",
  containersColors: "containers_light_colors",
  isDarkMode: false,
  implementDarkMode: () => {},
  stockHistoricalData: undefined,
  updateStockHistoricalData: () => {},
  updateToSevenDays: () => {},
  updateToSixWeeks: () => {},
  updateToFiveMonths: () => {},
  recentlySeenStocks: [],
  addToRecentlySeenStocks: () => {},
  deleteFromRecentlySeenStocks: () => {},
  reOrderRecentlySeenStocks: () => {},
  updateRecentlySeenStocks: () => {},
  isStocksInfoLoading: false,
  setStocksInfoLoadingToFalse: () => {},
  setStocksInfoLoadingToTrue: () => {},
});

export default function StocksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stockHistoricalData, setStockHistoricalData] = usePersistedState<
    StocksData[] | undefined
  >("stockHistoricalData", undefined);
  const [recentlySeenStocks, setRecentlySeenStocks] = usePersistedState<
    RecentlySeenStocks[] | []
  >("recentlySeenStocks", []);

  function updateStockHistoricalData(newData: StocksData[]) {
    setStockHistoricalData(newData);
  }
  function updateToSevenDays() {
    const sevenDaysOfStock = getSevenDaysStockData(
      recentlySeenStocks[0].stockData!
    );
    if (sevenDaysOfStock) {
      updateStockHistoricalData(sevenDaysOfStock);
    }
  }
  function updateToSixWeeks() {
    const sixWeeksOfStocks = getSixWeeksStockData(
      recentlySeenStocks[0].stockData!
    );
    if (sixWeeksOfStocks) {
      updateStockHistoricalData(sixWeeksOfStocks);
    }
  }
  function updateToFiveMonths() {
    const fiveMonthsOfStocks = getFiveMonthsStockData(
      recentlySeenStocks[0].stockData!
    );
    if (fiveMonthsOfStocks) {
      updateStockHistoricalData(fiveMonthsOfStocks);
    }
  }

  function addToRecentlySeenStocks(newStock: RecentlySeenStocks) {
    setRecentlySeenStocks((prevStocks) => [newStock, ...prevStocks]);
  }

  const updateRecentlySeenStocks = useCallback((stock: RecentlySeenStocks) => {
    setRecentlySeenStocks((prev) =>
      prev.map((prevStock) => {
        if (prevStock.stockOverview.symbol === stock.stockOverview.symbol) {
          return stock;
        } else {
          return prevStock;
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reOrderRecentlySeenStocks(firstStock: RecentlySeenStocks) {
    const filteredStocks = recentlySeenStocks.filter(
      (stock) => stock.stockOverview.symbol !== firstStock.stockOverview.symbol
    );

    setRecentlySeenStocks([firstStock, ...filteredStocks]);
  }

  function deleteFromRecentlySeenStocks(stockToDelete: RecentlySeenStocks) {
    console.log(stockToDelete);
    console.log(recentlySeenStocks);
    setRecentlySeenStocks((prev) =>
      prev.filter(
        (stock) =>
          stockToDelete.stockOverview.symbol !== stock.stockOverview.symbol
      )
    );
  }

  //loading state
  const [isStocksInfoLoading, setIsStocksInfoLoading] = useState(false);
  function setStocksInfoLoadingToFalse() {
    setIsStocksInfoLoading(false);
  }
  function setStocksInfoLoadingToTrue() {
    setIsStocksInfoLoading(true);
  }
  //loading state

  //Theme colors
  const [isDarkMode, setIsDarkMode] = usePersistedState(
    "isDarkMode",
    getItem("isDarkMode") === true ? true : false
  );
  const primaryColors = `${
    isDarkMode ? "primary_dark_mode_colors" : "primary_light_mode_colors"
  }`;
  const secondaryColors = `${
    isDarkMode ? "secondary_dark_mode_colors" : "secondary_light_mode_colors"
  }`;
  const accentColors = `${
    isDarkMode ? "accent_dark_mode_colors" : "accent_light_mode_colors"
  }`;
  const iconColors = `${
    isDarkMode ? "icon_dark_mode_colors" : "icon_light_mode_colors"
  }`;
  const containersColors = `${
    isDarkMode ? "containers_dark_colors" : "containers_light_colors"
  }`;
  function implementDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  //Theme colors

  //Update stocks quote and historical data using an time interval
  const currentStock = recentlySeenStocks[0];

  useEffect(() => {
    if (!currentStock) {
      return;
    }
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const todaysDate = `${year}-${month}-${day}`;

    const intervalId = setInterval(() => {
      if (todaysDate !== currentStock.historicalDataLastUpdate) {
        //update historical data and date of historical data
        fetchHistoricalData(currentStock.stockOverview.symbol).then(
          (updateStockHistoricalData) => {
            const updatedStock = {
              ...currentStock,
              stockData: updateStockHistoricalData,
              historicalDataLastUpdate: todaysDate,
            };
            updateRecentlySeenStocks(updatedStock);
          }
        );
      }

      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const timeDifferenceInMinutes =
        (Date.now() - currentStock.lastUpdated) / (1000 * 60);
      console.log(
        "Time difrenence in minutes since last update",
        timeDifferenceInMinutes
      );
      console.log("current time in minutes", minutes);
      //calculate time hours and minutes
      const quoteLastUpdate = `${hours} : ${minutes}`;

      if (timeDifferenceInMinutes > 15) {
        fetchQuote(currentStock.stockOverview.symbol).then((data) => {
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
        });
      }
    }, 30000); //repeat every 30 seconds
    return () => {
      clearInterval(intervalId);
    };
  }, [currentStock, updateRecentlySeenStocks]);

  return (
    <stocksContext.Provider
      value={{
        primaryColors,
        secondaryColors,
        accentColors,
        iconColors,
        containersColors,
        isDarkMode,
        implementDarkMode,
        stockHistoricalData,
        updateStockHistoricalData,
        updateToSevenDays,
        updateToSixWeeks,
        updateToFiveMonths,
        recentlySeenStocks,
        addToRecentlySeenStocks,
        deleteFromRecentlySeenStocks,
        reOrderRecentlySeenStocks,
        updateRecentlySeenStocks,
        isStocksInfoLoading,
        setStocksInfoLoadingToFalse,
        setStocksInfoLoadingToTrue,
      }}
    >
      {children}
    </stocksContext.Provider>
  );
}

export function useStocksContext() {
  return useContext(stocksContext);
}
