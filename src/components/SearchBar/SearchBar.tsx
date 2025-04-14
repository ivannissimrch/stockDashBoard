import "./SearchBar.css";
import StockSearchInput from "../StockSearchInput/StockSearchInput";
import { useStocksContext } from "../StocksContextProvider";

export default function SearchBar() {
  const { primaryColors } = useStocksContext();

  return (
    <div className={`searchbar_container ${primaryColors}`}>
      <StockSearchInput />
    </div>
  );
}
