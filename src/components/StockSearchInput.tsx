import React, { useState, useMemo, useEffect, useContext } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";
import {
  fetchQuote,
  fetchStockDetails,
  fetchStocksSymbols,
} from "../helpers/stockApi";
import { stockContext } from "../App";

type StockResultWithLabel = {
  label: string;
  symbol: string;
};

export default function StockSearchInput() {
  const { updateStockDetails, updateStockOverview } = useContext(stockContext);
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
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) {
    setSearchQuery(value);
    debounceFetchStockSuggestions(value);
  }

  async function handleStockSelectionChange(
    event: React.SyntheticEvent<Element, Event>,
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
