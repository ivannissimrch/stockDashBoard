import "./SearchBar.css";

import StockSearchInput from "../StockSearchInput/StockSearchInput";
import { useContext } from "react";
import { stockContext } from "../../App";

export default function SearchBar() {
  const { primaryColors } = useContext(stockContext);

  return (
    <div className={`searchbar_container ${primaryColors}`}>
      <StockSearchInput />
    </div>
  );
}
