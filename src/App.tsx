import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Chart from "./components/Chart";
import SearchBar from "./components/SearchBar";
import StockDetails from "./components/StockDetails";
import { useState } from "react";
import { createContext } from "react";
import { StockDetailsType } from "./helpers/stockApi";
import StockOverview from "./components/StockOverview";

interface ContextTypes {
  stockDetails: StockDetailsType | undefined;
  updateStockDetails: (newDetails: StockDetailsType) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const stockContext = createContext<ContextTypes>({
  stockDetails: undefined,
  updateStockDetails: () => {},
  stockOverview: undefined,
  updateStockOverview: () => {},
});

type StockOverview = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
};

export default function App() {
  const [stockDetails, setStockDetails] = useState<
    StockDetailsType | undefined
  >();
  const [stockOverview, setStockOverview] = useState<
    StockOverview | undefined
  >();

  function updateStockDetails(newDetails: StockDetailsType) {
    setStockDetails(newDetails);
  }

  function updateStockOverview(newStockOverview: StockOverview) {
    setStockOverview(newStockOverview);
  }

  return (
    <stockContext.Provider
      value={{
        stockDetails,
        updateStockDetails,
        stockOverview,
        updateStockOverview,
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
            <StockOverview />
            <StockDetails />
          </Grid>
        </Grid>
      </Box>
    </stockContext.Provider>
  );
}
