import Grid from "@mui/material/Unstable_Grid2";
import Chart from "./components/Chart";
import SearchBar from "./components/SearchBar";
import DisplayStockDetails from "./components/DisplayStockDetails";
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
    setStockDetails(newDetails);
  }
  function updateStockOverview(newStockOverview: StockOverview) {
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
        {/* //TODO latter */}
        <SearchBar />
        <DashboardTitle>Dashboard</DashboardTitle>
        <ChartContainer>
          <DisplayStockOverview />
          {/* //TODO Latter */}
          <Chart />
        </ChartContainer>
        <Grid xs={12} md={12} lg={5}>
          <DisplayStockDetails />
        </Grid>
      </main>
    </stockContext.Provider>
  );
}
