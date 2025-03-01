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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ContextTypes {
  stockDetails: StockDetails | undefined;
  updateStockDetails: (newDetails: StockDetails) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
  stockHistoricalData: StocksData[] | undefined;
  updateStockHistoricalData: (newDetails: StocksData[]) => void;
  primaryColors: string;
  accentColors: string;
  iconColors: string;
  containersColors: string;
  isDarkMode: boolean;
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
  primaryColors: "primary_light_mode_colors",
  accentColors: "accent_light_mode_colors",
  iconColors: "icon_light_mode_colors",
  containersColors: "containers_light_colors",
  isDarkMode: false,
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
  console.log(stockHistoricalData);
  // const chartButtons = ["7 Day", "6 Week", "5 Month"];
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

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

  function implementDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <stockContext.Provider
        value={{
          stockDetails,
          updateStockDetails,
          stockOverview,
          updateStockOverview,
          updateStockHistoricalData,
          stockHistoricalData,
          primaryColors,
          accentColors,
          iconColors,
          containersColors,
          isDarkMode,
        }}
      >
        <main className={`app_main_container ${secondaryColors}`}>
          <NavBar />
          <section className="secondary_container">
            <SearchBar />
            <DashboardTitle onClick={implementDarkMode}>
              Dashboard
            </DashboardTitle>
            <ChartContainer>
              <DisplayStockOverview />
              <div className="line_container">
                <hr className="chart_line" />
              </div>
              <ButtonGroup>
                <Button
                  onClick={updateToSevenDays}
                  active={`${
                    stockHistoricalData?.length === 7 ? "button_active" : ""
                  }`}
                >
                  7 days
                </Button>
                <Button
                  onClick={updateToSixWeeks}
                  active={`${
                    stockHistoricalData?.length === 6 ? "button_active" : ""
                  }`}
                >
                  6 Weeks
                </Button>
                <Button
                  onClick={updateToFiveMonths}
                  active={`${
                    stockHistoricalData?.length === 5 ? "button_active" : ""
                  }`}
                >
                  5 months
                </Button>
              </ButtonGroup>
              <Chart />
            </ChartContainer>
            <DisplayStockDetails />
          </section>
        </main>
      </stockContext.Provider>
    </ThemeProvider>
  );
}
