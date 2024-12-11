import { useState, useMemo, useEffect, useContext } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";
import {
  fetchVantageStockData,
  fetchQuote,
  fetchStockDetails,
} from "../helpers/stockApi";
import { stockContext } from "../App";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import fetchStocksSymbols from "../helpers/fetchStocksSymbols";

interface StockResultWithLabel {
  label: string;
  symbol: string;
}

export default function StockSearchInput() {
  const { updateStockDetails, updateStockOverview, updateStockHistoricalData } =
    useContext(stockContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockSuggestionList, setStockSuggestionList] = useState<
    StockResultWithLabel[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchStockSuggestions(searchInputText: string) {
    setIsLoading(true);
    try {
      const stocks = await fetchStocksSymbols(searchInputText);
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
      const selectedStockDetails = await fetchStockDetails(newValue.symbol);
      const stockQuote = await fetchQuote(newValue.symbol);
      if (stockQuote && selectedStockDetails) {
        const stockOverview = {
          symbol: newValue.symbol,
          price: stockQuote.pc,
          change: stockQuote.d,
          changePercent: stockQuote.dp,
          currency: selectedStockDetails.currency,
        };
        updateStockOverview(stockOverview);
        updateStockDetails(selectedStockDetails);

        const stockDailyData = await fetchVantageStockData(newValue.symbol);
        //store return value to local storage??
        localStorage.setItem(
          "storedStocksData",
          JSON.stringify(stockDailyData)
        );
        const sevenDaysStocks = getSevenDaysStockData();

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
      autoComplete
      openOnFocus
      autoSelect
      options={stockSuggestionList}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for Stock"
          InputProps={{
            ...params.InputProps,
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
      sx={{ width: 300 }}
    />
  );
}
