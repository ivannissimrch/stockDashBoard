import { useState } from "react";
import { createContext } from "react";
import { StockDetails } from "./helpers/fetchStockDetails";
import "./app.css";
import getSevenDaysStockData from "./helpers/getSevenDaysStockData";
import getSixWeeksStockData from "./helpers/getSixWeeksStockData";
import getFiveMonthsStockData from "./helpers/getFiveMonthsStockData";
import getStoredDataFromStorage from "./helpers/getStoredDataFromStorage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/HomePage.js";
import DashBoardPage from "./pages/DashBoardPage.js";
import ContactUsPage from "./pages/ContactUsPage.js";

interface ContextTypes {
  stockDetails: StockDetails | undefined;
  updateStockDetails: (newDetails: StockDetails) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
  stockHistoricalData: StocksData[] | undefined;
  updateStockHistoricalData: (newDetails: StocksData[]) => void;
  primaryColors: string;
  secondaryColors: string;
  accentColors: string;
  iconColors: string;
  containersColors: string;
  isDarkMode: boolean;
  implementDarkMode: () => void;
  updateToSevenDays: () => void;
  updateToSixWeeks: () => void;
  updateToFiveMonths: () => void;
  recentlySeenStocks: RecentlySeenStocks[] | [];
  addToRecentlySeenStocks: (stockOverview: RecentlySeenStocks) => void;
  deleteToRecentlySeenStocks: (stockOverview: RecentlySeenStocks) => void;
}

export interface StockOverview {
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

export interface RecentlySeenStocks {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
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
});

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        {
          path: "",

          element: <HomePage />,
        },
        {
          path: "dashboard",

          element: <DashBoardPage />,
        },
        {
          path: "contactUs",

          element: <ContactUsPage />,
        },
      ],
    },
  ]);

  const [stockDetails, setStockDetails] = useState<StockDetails | undefined>();
  const [stockOverview, setStockOverview] = useState<
    StockOverview | undefined
  >();
  const [stockHistoricalData, setStockHistoricalData] = useState<
    StocksData[] | undefined
  >();

  const stocksData = getStoredDataFromStorage();
  console.log(stockHistoricalData);

  const [recentlySeenStocks, setRecentlySeenStocks] = useState<
    RecentlySeenStocks[] | []
  >([]);
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

  function addToRecentlySeenStocks(newStock: RecentlySeenStocks) {
    setRecentlySeenStocks((prevStocks) => [newStock, ...prevStocks]);
  }

  function deleteToRecentlySeenStocks(stockToDelete: RecentlySeenStocks) {
    setRecentlySeenStocks((prev) =>
      prev.filter((stock) => stockToDelete !== stock)
    );
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
        }}
      >
        <RouterProvider router={router} />
      </stockContext.Provider>
    </ThemeProvider>
  );
}
