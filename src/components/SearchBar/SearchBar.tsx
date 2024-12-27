import "./SearchBar.css";

import StockSearchInput from "../StockSearchInput/StockSearchInput";

export default function SearchBar() {
  return (
    <nav className="navbar_container">
      <StockSearchInput />
    </nav>
  );
}
