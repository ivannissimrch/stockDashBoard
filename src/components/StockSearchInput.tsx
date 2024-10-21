import { useState, useMemo, useEffect, useContext } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";
import {
  fetchDailyHistoricalData,
  fetchQuote,
  fetchStockDetails,
  fetchStocksSymbols,
} from "../helpers/stockApi";
import { stockContext } from "../App";

interface StockResultWithLabel {
  label: string;
  symbol: string;
}

export interface HistoricalData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
  date: string;
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
        const dataForChart = await fetchDailyHistoricalData(newValue.symbol);
        const datesObjects = dataForChart?.["Time Series (Daily)"];
        const dateObjectsKeys = datesObjects ? Object.keys(datesObjects) : [];
        const weekKeys = dateObjectsKeys.filter((_stock, idx) => idx < 7);
        const oneWeekStocks = weekKeys.map((key) => {
          return {
            ...datesObjects?.[key],
            date: key,
          } as HistoricalData;
        });
        updateStockHistoricalData(oneWeekStocks);
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
