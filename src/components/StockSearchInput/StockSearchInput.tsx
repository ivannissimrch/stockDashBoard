import "./StockSearchInput.css";
import { useState, useMemo, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import debounce from "lodash.debounce";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";
import fetchStocksSymbols from "../../helpers/fetchStocksSymbols";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useRecentlySeenStocksContext } from "../../contexts/RecentlySeenStocksContext";
import { useHistoricalDataContext } from "../../contexts/HistoricalDataContext";
import fetchAllDataForStocks from "../../helpers/fetchAllDataForStocks";
import { StockSymbols } from "../../types";
import getErrorMessage from "../../helpers/getErrorMessage";

interface StockResultWithLabel {
  label: string;
  symbol: string;
}

export default function StockSearchInput() {
  const {
    addToRecentlySeenStocks,
    recentlySeenStocks,
    reOrderRecentlySeenStocks,
    setRecentlySeenLoading,
  } = useRecentlySeenStocksContext();

  const { updateStockHistoricalData, setHistoricalLoading } =
    useHistoricalDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [stockSuggestionList, setStockSuggestionList] = useState<
    StockResultWithLabel[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchStockSuggestions(searchInputText: string) {
    setIsLoading(true);
    setError(null);
    try {
      if (searchInputText === "") {
        return;
      }
      const stocks: StockSymbols[] = await fetchStocksSymbols(searchInputText);
      const results = stocks.map((stock) => ({
        label: `${stock.description} ${stock.symbol}`,
        symbol: stock.symbol,
      }));
      setStockSuggestionList(results);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  const debounceFetchStockSuggestions = useMemo(
    () =>
      debounce(
        (searchInputText: string) => fetchStockSuggestions(searchInputText),
        500
      ),
    []
  );

  function handleSearchQueryChange(
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: string
  ) {
    setSearchQuery(value);

    if (reason === "input") {
      debounceFetchStockSuggestions(value);
    }
  }

  async function handleStockSelectionChange(
    _event: React.SyntheticEvent<Element, Event>,
    newValue: StockResultWithLabel | null
  ) {
    if (!newValue) return;
    setError(null);

    // Check if stock is already in local storage (no API call needed)
    const isOnLocalStorage = recentlySeenStocks.find((stock) => {
      return stock.stockOverview.symbol === newValue.symbol;
    });

    if (isOnLocalStorage) {
      reOrderRecentlySeenStocks(isOnLocalStorage);
      const sevenDaysStocks = getSevenDaysStockData(isOnLocalStorage.stockData);
      if (sevenDaysStocks) {
        updateStockHistoricalData(sevenDaysStocks);
      }
      return;
    }

    // Fetch from API - wrap in try/catch to handle errors
    setRecentlySeenLoading(true);
    setHistoricalLoading(true);
    try {
      const result = await fetchAllDataForStocks(newValue.symbol);
      const [selectedStockDetails, stockQuote, stockDailyData] = result;

      const stockOverview = {
        symbol: newValue.symbol,
        price: stockQuote.c,
        change: stockQuote.d,
        changePercent: stockQuote.dp,
        currency: selectedStockDetails.currency,
      };
      const timeStamp = Date.now();

      addToRecentlySeenStocks({
        lastUpdated: timeStamp,
        quoteLastUpdate: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        historicalDataLastUpdate: Object.keys(stockDailyData)[0],
        stockOverview: stockOverview,
        stockDetails: selectedStockDetails,
        stockData: stockDailyData,
      });

      const sevenDaysStocks = getSevenDaysStockData(stockDailyData);
      if (sevenDaysStocks) {
        updateStockHistoricalData(sevenDaysStocks);
      }

      setStockSuggestionList([]);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setRecentlySeenLoading(false);
      setHistoricalLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      debounceFetchStockSuggestions.cancel();
    };
  }, [debounceFetchStockSuggestions]);

  return (
    <div className="search_wrapper">
      <Autocomplete
        className="search_bar_container"
        autoComplete
        openOnFocus
        autoSelect
        options={stockSuggestionList}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            className="search_bar_input_field"
            {...params}
            placeholder="Search for Stock"
            InputProps={{
              ...params.InputProps,
              startAdornment: <GridSearchIcon />,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        inputValue={searchQuery}
        onInputChange={handleSearchQueryChange}
        onChange={handleStockSelectionChange}
        id="userQuery"
      />

      <Snackbar
        open={error !== null}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
