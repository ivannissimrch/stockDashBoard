import "./StockSearchInput.css";
import { useState, useMemo, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";
import fetchStocksSymbols from "../../helpers/fetchStocksSymbols";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useStocksContext } from "../StocksContextProvider";
import fetchAllDataForStocks from "../../helpers/fetchAllDataForStocks";
import { StockSymbols } from "../../types";

interface StockResultWithLabel {
  label: string;
  symbol: string;
}

export default function StockSearchInput() {
  const {
    updateStockHistoricalData,
    addToRecentlySeenStocks,
    setStocksInfoLoadingToFalse,
    setStocksInfoLoadingToTrue,
    recentlySeenStocks,
    reOrderRecentlySeenStocks,
  } = useStocksContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [stockSuggestionList, setStockSuggestionList] = useState<
    StockResultWithLabel[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchStockSuggestions(searchInputText: string) {
    setIsLoading(true);
    try {
      if (searchInputText === "") {
        console.log("return");
        return;
      }
      const stocks: StockSymbols[] = await fetchStocksSymbols(searchInputText);
      const results = stocks.map((stock) => ({
        label: `${stock.description} ${stock.symbol}`,
        symbol: stock.symbol,
      }));
      setStockSuggestionList(results);
    } catch (error) {
      console.log(error);
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
    value: string
  ) {
    setSearchQuery(value);
    debounceFetchStockSuggestions(value);
  }

  async function handleStockSelectionChange(
    _event: React.SyntheticEvent<Element, Event>,
    newValue: StockResultWithLabel | null
  ) {
    if (newValue) {
      //check if value is already store
      const isOnLocalStorage = recentlySeenStocks.find((stock) => {
        return stock.stockOverview.symbol === newValue.symbol;
      });
      if (isOnLocalStorage) {
        reOrderRecentlySeenStocks(isOnLocalStorage);
        const sevenDaysStocks = getSevenDaysStockData(
          isOnLocalStorage.stockData
        );
        if (sevenDaysStocks) {
          updateStockHistoricalData(sevenDaysStocks);
        }
        return;
      }
      //check if value is already store

      setStocksInfoLoadingToTrue();
      const [selectedStockDetails, stockQuote, stockDailyData] =
        await fetchAllDataForStocks(newValue.symbol);
      setStocksInfoLoadingToFalse();

      if (stockQuote && selectedStockDetails) {
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

        // updateStocksData(stockDailyData);
        const sevenDaysStocks = getSevenDaysStockData(stockDailyData);
        if (sevenDaysStocks) {
          updateStockHistoricalData(sevenDaysStocks);
        }
      }
      setStockSuggestionList([]);
    }
  }

  useEffect(() => {
    return () => {
      debounceFetchStockSuggestions.cancel();
    };
  }, [debounceFetchStockSuggestions]);

  return (
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
  );
}
