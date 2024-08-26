import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { getStocksData } from "../helpers/stockApi";

type stockResults = {
  label: string;
};

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [stocksResults, setStocksResults] = useState<stockResults[]>([
    { label: "" },
  ]);

  async function handleSearchInput(event: React.SyntheticEvent) {
    const userEnteredInput = event.target.value;
    setInputValue(userEnteredInput);
    const stocks = await getStocksData(userEnteredInput);
    console.log(stocks);

    const results = stocks.map((stock) => {
      return {
        label: stock.displaySymbol,
      };
    });
    setStocksResults(results);
  }

  return (
    <Autocomplete
      freeSolo
      autoSelect
      // onChange={(event: Event, newValue: string | null) => {
      //   if (event) {
      //     console.log(event.target.outerText);
      //     setInputValue(event.target.outerText);
      //   }
      // }}
      inputValue={inputValue}
      onInputChange={handleSearchInput}
      id="controllable-states-demo"
      options={stocksResults.map((option) => option.label)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search for Stock" />
      )}
    />
  );
}
