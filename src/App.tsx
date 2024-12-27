import Chart from "./components/Chart";
import SearchBar from "./components/SearchBar/SearchBar";
import DisplayStockDetails from "./components/DisplayStockDetails/DisplayStockDetails";
import { useState } from "react";
import { createContext } from "react";
import { StockDetails } from "./helpers/fetchStockDetails";
import DisplayStockOverview from "./components/DisplayStockOverview/DisplayStockOverview";
import "./app.css";
import ChartContainer from "./components/ChartContainer/ChartContainer";
import DashboardTitle from "./components/DashBoardTitle/DashboardTitle";

interface ContextTypes {
  stockDetails: StockDetails | undefined;
  updateStockDetails: (newDetails: StockDetails) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
  stockHistoricalData: StocksData[] | undefined;
  updateStockHistoricalData: (newDetails: StocksData[]) => void;
}

interface StockOverview {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export interface StocksData {
  closingPrices: number;
  date: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const stockContext = createContext<ContextTypes>({
  stockDetails: undefined,
  updateStockDetails: () => {},
  stockOverview: undefined,
  updateStockOverview: () => {},
  stockHistoricalData: undefined,
  updateStockHistoricalData: () => {},
});

export default function App() {
  const [stockDetails, setStockDetails] = useState<StockDetails | undefined>();
  const [stockOverview, setStockOverview] = useState<
    StockOverview | undefined
  >();
  const [stockHistoricalData, setStockHistoricalData] = useState<
    StocksData[] | undefined
  >();

  function updateStockDetails(newDetails: StockDetails) {
    console.log(newDetails);
    setStockDetails(newDetails);
  }
  function updateStockOverview(newStockOverview: StockOverview) {
    console.log(newStockOverview);
    setStockOverview(newStockOverview);
  }
  function updateStockHistoricalData(newData: StocksData[]) {
    setStockHistoricalData(newData);
  }

  return (
    <stockContext.Provider
      value={{
        stockDetails,
        updateStockDetails,
        stockOverview,
        updateStockOverview,
        updateStockHistoricalData,
        stockHistoricalData,
      }}
    >
      <main className="app_main_container">
        <SearchBar />
        <DashboardTitle>Dashboard</DashboardTitle>
        <ChartContainer>
          <DisplayStockOverview />
          <Chart />
        </ChartContainer>
        <DisplayStockDetails />
      </main>
    </stockContext.Provider>
  );
}
