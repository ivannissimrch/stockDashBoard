import RecentlySeenStock from "../RecentlySeenStock/RecentlySeenStock";
import { useStocksContext } from "../StocksContextProvider";
import "./NavBar.css";

export default function NavBar() {
  const { primaryColors, accentColors, recentlySeenStocks } =
    useStocksContext();
  return (
    <nav className={`navbar_container ${primaryColors}`}>
      <div className="navbar_logo_container">
        <h1 className={`navbar_logo colors ${accentColors}`}>
          {" "}
          Stock Dashboard
        </h1>
      </div>

      {recentlySeenStocks.map((stock) => (
        <RecentlySeenStock key={stock.symbol} stock={stock} />
      ))}
    </nav>
  );
}
