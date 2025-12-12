import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StocksData } from "../types";
import { usePersistedState } from "../hooks/usePersistedState";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import { useRecentlySeenStocksContext } from "./RecentlySeenStocksContext";

export interface HistoricalDataContextType {
  stockHistoricalData: StocksData[] | undefined;
  updateStockHistoricalData: (newData: StocksData[]) => void;
  updateToSevenDays: () => void;
  updateToSixWeeks: () => void;
  updateToFiveMonths: () => void;
  isHistoricalLoading: boolean;
  setHistoricalLoading: (loading: boolean) => void;
}

export const HistoricalDataContext = createContext<HistoricalDataContextType>({
  stockHistoricalData: undefined,
  updateStockHistoricalData: () => {},
  updateToSevenDays: () => {},
  updateToSixWeeks: () => {},
  updateToFiveMonths: () => {},
  isHistoricalLoading: false,
  setHistoricalLoading: () => {},
});

export default function HistoricalDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { recentlySeenStocks } = useRecentlySeenStocksContext();

  const [stockHistoricalData, setStockHistoricalData] = usePersistedState<
    StocksData[] | undefined
  >("stockHistoricalData", undefined);

  const [isHistoricalLoading, setIsHistoricalLoading] = useState(false);

  const setHistoricalLoading = useCallback((loading: boolean) => {
    setIsHistoricalLoading(loading);
  }, []);

  const updateStockHistoricalData = useCallback(
    (newData: StocksData[]) => {
      setStockHistoricalData(newData);
    },
    [setStockHistoricalData]
  );

  const updateToSevenDays = useCallback(() => {
    const sevenDaysOfStock = getSevenDaysStockData(
      recentlySeenStocks[0].stockData!
    );
    if (sevenDaysOfStock) {
      updateStockHistoricalData(sevenDaysOfStock);
    }
  }, [recentlySeenStocks, updateStockHistoricalData]);

  const updateToSixWeeks = useCallback(() => {
    const sixWeeksOfStocks = getSixWeeksStockData(
      recentlySeenStocks[0].stockData!
    );
    if (sixWeeksOfStocks) {
      updateStockHistoricalData(sixWeeksOfStocks);
    }
  }, [recentlySeenStocks, updateStockHistoricalData]);

  const updateToFiveMonths = useCallback(() => {
    const fiveMonthsOfStocks = getFiveMonthsStockData(
      recentlySeenStocks[0].stockData!
    );
    if (fiveMonthsOfStocks) {
      updateStockHistoricalData(fiveMonthsOfStocks);
    }
  }, [updateStockHistoricalData, recentlySeenStocks]);

  const contextValue = useMemo(
    () => ({
      stockHistoricalData,
      updateStockHistoricalData,
      updateToSevenDays,
      updateToSixWeeks,
      updateToFiveMonths,
      isHistoricalLoading,
      setHistoricalLoading,
    }),
    [
      stockHistoricalData,
      updateStockHistoricalData,
      updateToSevenDays,
      updateToSixWeeks,
      updateToFiveMonths,
      isHistoricalLoading,
      setHistoricalLoading,
    ]
  );

  return (
    <HistoricalDataContext.Provider value={contextValue}>
      {children}
    </HistoricalDataContext.Provider>
  );
}

export function useHistoricalDataContext() {
  return useContext(HistoricalDataContext);
}
