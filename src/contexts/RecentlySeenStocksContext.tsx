import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { RecentlySeenStocks } from "../types";
import { usePersistedState } from "../hooks/usePersistedState";

export interface RecentlySeenStocksContextType {
  recentlySeenStocks: RecentlySeenStocks[] | [];
  addToRecentlySeenStocks: (stock: RecentlySeenStocks) => void;
  deleteFromRecentlySeenStocks: (stock: RecentlySeenStocks) => void;
  reOrderRecentlySeenStocks: (newFirstStock: RecentlySeenStocks) => void;
  updateRecentlySeenStocks: (stock: RecentlySeenStocks) => void;
  isRecentlySeenLoading: boolean;
  setRecentlySeenLoading: (loading: boolean) => void;
}

export const RecentlySeenStocksContext = createContext<RecentlySeenStocksContextType>({
  recentlySeenStocks: [],
  addToRecentlySeenStocks: () => {},
  deleteFromRecentlySeenStocks: () => {},
  reOrderRecentlySeenStocks: () => {},
  updateRecentlySeenStocks: () => {},
  isRecentlySeenLoading: false,
  setRecentlySeenLoading: () => {},
});

export default function RecentlySeenStocksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlySeenStocks, setRecentlySeenStocks] = usePersistedState<
    RecentlySeenStocks[] | []
  >("recentlySeenStocks", []);

  const [isRecentlySeenLoading, setIsRecentlySeenLoading] = useState(false);

  const setRecentlySeenLoading = useCallback((loading: boolean) => {
    setIsRecentlySeenLoading(loading);
  }, []);

  const addToRecentlySeenStocks = useCallback(
    (newStock: RecentlySeenStocks) => {
      setRecentlySeenStocks((prevStocks) => [newStock, ...prevStocks]);
    },
    [setRecentlySeenStocks]
  );

  const updateRecentlySeenStocks = useCallback(
    (stock: RecentlySeenStocks) => {
      setRecentlySeenStocks((prev) =>
        prev.map((prevStock) => {
          if (prevStock.stockOverview.symbol === stock.stockOverview.symbol) {
            return stock;
          } else {
            return prevStock;
          }
        })
      );
    },
    [setRecentlySeenStocks]
  );

  const reOrderRecentlySeenStocks = useCallback(
    (firstStock: RecentlySeenStocks) => {
      const filteredStocks = recentlySeenStocks.filter(
        (stock) =>
          stock.stockOverview.symbol !== firstStock.stockOverview.symbol
      );

      setRecentlySeenStocks([firstStock, ...filteredStocks]);
    },
    [setRecentlySeenStocks, recentlySeenStocks]
  );

  const deleteFromRecentlySeenStocks = useCallback(
    (stockToDelete: RecentlySeenStocks) => {
      setRecentlySeenStocks((prev) =>
        prev.filter(
          (stock) =>
            stockToDelete.stockOverview.symbol !== stock.stockOverview.symbol
        )
      );
    },
    [setRecentlySeenStocks]
  );

  const contextValue = useMemo(
    () => ({
      recentlySeenStocks,
      addToRecentlySeenStocks,
      deleteFromRecentlySeenStocks,
      reOrderRecentlySeenStocks,
      updateRecentlySeenStocks,
      isRecentlySeenLoading,
      setRecentlySeenLoading,
    }),
    [
      recentlySeenStocks,
      addToRecentlySeenStocks,
      deleteFromRecentlySeenStocks,
      reOrderRecentlySeenStocks,
      updateRecentlySeenStocks,
      isRecentlySeenLoading,
      setRecentlySeenLoading,
    ]
  );

  return (
    <RecentlySeenStocksContext.Provider value={contextValue}>
      {children}
    </RecentlySeenStocksContext.Provider>
  );
}

export function useRecentlySeenStocksContext() {
  return useContext(RecentlySeenStocksContext);
}
