import "./SearchBar.css";
import StockSearchInput from "../StockSearchInput/StockSearchInput";
import { useThemeContext } from "../../ThemeContext";

export default function SearchBar() {
  const { primaryColors } = useThemeContext();

  return (
    <div className={`searchbar_container ${primaryColors}`}>
      <StockSearchInput />
    </div>
  );
}
