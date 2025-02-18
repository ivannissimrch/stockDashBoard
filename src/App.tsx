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
import NavBar from "./components/NavBar/NarBar";
import ButtonGroup from "./components/ButtonGroup/ButtonGroup";
import Button from "./components/Button/Button";
import getSevenDaysStockData from "./helpers/getSevenDaysStockData";
import getSixWeeksStockData from "./helpers/getSixWeeksStockData";
import getFiveMonthsStockData from "./helpers/getFiveMonthsStockData";
import getStoredDataFromStorage from "./helpers/getStoredDataFromStorage";

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

  const stocksData = getStoredDataFromStorage();
  // const chartButtons = ["7 Day", "6 Week", "5 Month"];

  function updateStockDetails(newDetails: StockDetails) {
    setStockDetails(newDetails);
  }
  function updateStockOverview(newStockOverview: StockOverview) {
    setStockOverview(newStockOverview);
  }
  function updateStockHistoricalData(newData: StocksData[]) {
    console.log(newData);
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

  function implementDarkMode() {
    alert("Dark Mode");
    console.log("dark mode function");
    setIsDarkMode(true);
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode);

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
        <NavBar />
        <section className="secondary_container">
          <SearchBar />
          <DashboardTitle onClick={implementDarkMode}>Dashboard</DashboardTitle>
          <ChartContainer>
            <DisplayStockOverview />
            <div className="line_container">
              <hr className="chart_line" />
            </div>
            <ButtonGroup>
              <Button onClick={updateToSevenDays}>7 days</Button>
              <Button onClick={updateToSixWeeks}>6 Weeks</Button>
              <Button onClick={updateToFiveMonths}>5 months</Button>
            </ButtonGroup>
            <Chart />
          </ChartContainer>
          <DisplayStockDetails />
        </section>
      </main>
    </stockContext.Provider>
  );
}
