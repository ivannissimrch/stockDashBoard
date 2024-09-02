import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";
import { getStocksData } from "../helpers/stockApi";

type StockResultWithLabel = {
  label: string;
  symbol: string;
};

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [stocksResults, setStocksResults] = useState<StockResultWithLabel[]>(
    []
  );

  let timeoutId: NodeJS.Timeout | number = 0;

  async function handleSearchInput(
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) {
    if (timeoutId !== 0) {
      clearTimeout(timeoutId);
    }
    const userEnteredInput = value;
    setInputValue(userEnteredInput);
    timeoutId = setTimeout(async () => {
      const stocks = await getStocksData(userEnteredInput);
      const results = stocks.map((stock) => {
        return {
          label: `${stock.description} ${stock.symbol}`,
          symbol: stock.symbol,
        };
      });
      setStocksResults(results);
    }, 500);
  }

  return (
    <Autocomplete
      autoComplete
      openOnFocus
      autoSelect
      options={stocksResults.map((option) => option.label)}
      filterOptions={(options, state) => {
        return state.inputValue.length > 2 ? options : [];
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search for Stock" />
      )}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        newValue: string | null
      ) => {
        if (newValue) {
          setStocksResults([]);
          console.log(
            "call function on App component to fetch selected stock details"
          );
        }
      }}
      inputValue={inputValue}
      onInputChange={handleSearchInput}
      id="userQuery"
      sx={{ width: 300 }}
    />
  );
}
