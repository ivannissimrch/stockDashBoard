import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Chart from "./components/Chart";
import SearchBar from "./components/SearchBar";
import DisplayStockDetails from "./components/DisplayStockDetails";
import { useState } from "react";
import { createContext } from "react";
import { StockDetails } from "./helpers/stockApi";
import DisplayStockOverview from "./components/DisplayStockOverview";
import { HistoricalData } from "./components/StockSearchInput";

interface ContextTypes {
  stockDetails: StockDetails | undefined;
  updateStockDetails: (newDetails: StockDetails) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
  stockHistoricalData: HistoricalData[] | undefined;
  updateStockHistoricalData: (newDetails: HistoricalData[]) => void;
}

interface StockOverview {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
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
    HistoricalData[] | undefined
  >();

  function updateStockDetails(newDetails: StockDetails) {
    setStockDetails(newDetails);
  }
  function updateStockOverview(newStockOverview: StockOverview) {
    setStockOverview(newStockOverview);
  }
  function updateStockHistoricalData(newData: HistoricalData[]) {
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
      <Box sx={{ flexGrow: 1 }} height={840}>
        <Typography variant="h2" gutterBottom>
          Stock dashboard
        </Typography>
        <SearchBar />
        <Grid container spacing={2} columns={{ xs: 12, md: 12 }} margin={2}>
          <Grid xs={12} md={7}>
            <Chart />
          </Grid>
          <Grid xs={12} md={5}>
            <DisplayStockOverview />
            <DisplayStockDetails />
          </Grid>
        </Grid>
      </Box>
    </stockContext.Provider>
  );
}
