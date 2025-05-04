import React, { createContext, useContext, useState } from "react";
import { ContextTypes, RecentlySeenStocks, StocksData } from "../types";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import { usePersistedState } from "../hooks/usePersistedState";
import { getItem } from "../helpers/localStorage";

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
  upDateRecentlySeenStocks: () => {},
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

  function upDateRecentlySeenStocks(stock: RecentlySeenStocks) {
    setRecentlySeenStocks((prev) =>
      prev.map((prevStock) => {
        if (prevStock.stockOverview.symbol === stock.stockOverview.symbol) {
          return stock;
        } else {
          return prevStock;
        }
      })
    );
  }

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
        upDateRecentlySeenStocks,
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
