import React, { createContext, useContext, useState } from "react";
import getStoredDataFromStorage from "../helpers/getStoredDataFromStorage";
import {
  ContextTypes,
  RecentlySeenStocks,
  StockDetails,
  StockOverview,
  StocksData,
} from "../types";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";

export const stocksContext = createContext<ContextTypes>({
  stockDetails: undefined,
  updateStockDetails: () => {},
  stockOverview: undefined,
  updateStockOverview: () => {},
  stockHistoricalData: undefined,
  updateStockHistoricalData: () => {},
  primaryColors: "primary_light_mode_colors",
  secondaryColors: "secondary_light_mode_colors",
  accentColors: "accent_light_mode_colors",
  iconColors: "icon_light_mode_colors",
  containersColors: "containers_light_colors",
  isDarkMode: false,
  implementDarkMode: () => {},
  updateToSevenDays: () => {},
  updateToSixWeeks: () => {},
  updateToFiveMonths: () => {},
  recentlySeenStocks: [],
  addToRecentlySeenStocks: () => {},
  deleteToRecentlySeenStocks: () => {},
  isStocksInfoLoading: false,
  setStocksInfoLoadingToFalse: () => {},
  setStocksInfoLoadingToTrue: () => {},
});

export default function StocksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stockDetails, setStockDetails] = useState<StockDetails | undefined>();
  const [stockOverview, setStockOverview] = useState<
    StockOverview | undefined
  >();
  const [stockHistoricalData, setStockHistoricalData] = useState<
    StocksData[] | undefined
  >();
  const [recentlySeenStocks, setRecentlySeenStocks] = useState<
    RecentlySeenStocks[] | []
  >([]);

  function updateStockDetails(newDetails: StockDetails) {
    setStockDetails(newDetails);
  }
  function updateStockOverview(newStockOverview: StockOverview) {
    setStockOverview(newStockOverview);
  }
  function updateStockHistoricalData(newData: StocksData[]) {
    setStockHistoricalData(newData);
  }
  function updateToSevenDays() {
    const sevenDaysOfStock = getSevenDaysStockData(stocksData!);
    if (sevenDaysOfStock) {
      updateStockHistoricalData(sevenDaysOfStock);
    }
  }
  function updateToSixWeeks() {
    const sixWeeksOfStocks = getSixWeeksStockData(stocksData!);
    if (sixWeeksOfStocks) {
      updateStockHistoricalData(sixWeeksOfStocks);
    }
  }
  function updateToFiveMonths() {
    const fiveMonthsOfStocks = getFiveMonthsStockData(stocksData!);
    if (fiveMonthsOfStocks) {
      updateStockHistoricalData(fiveMonthsOfStocks);
    }
  }

  function addToRecentlySeenStocks(newStock: RecentlySeenStocks) {
    setRecentlySeenStocks((prevStocks) => [newStock, ...prevStocks]);
  }

  function deleteToRecentlySeenStocks(stockToDelete: RecentlySeenStocks) {
    setRecentlySeenStocks((prev) =>
      prev.filter((stock) => stockToDelete !== stock)
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

  // local storage
  const stocksData = getStoredDataFromStorage();
  // local storage

  //Theme colors
  const [isDarkMode, setIsDarkMode] = useState(true);
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
        stockDetails,
        updateStockDetails,
        stockOverview,
        updateStockOverview,
        stockHistoricalData,
        updateStockHistoricalData,
        primaryColors,
        secondaryColors,
        accentColors,
        iconColors,
        containersColors,
        isDarkMode,
        implementDarkMode,
        updateToSevenDays,
        updateToSixWeeks,
        updateToFiveMonths,
        recentlySeenStocks,
        addToRecentlySeenStocks,
        deleteToRecentlySeenStocks,
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
