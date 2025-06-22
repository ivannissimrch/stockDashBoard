import AsideDrawer from "../Drawer/AsideDrawer";
import RecentlySeenStock from "../RecentlySeenStock/RecentlySeenStock";
import { useStocksContext } from "../StocksContextProvider";
import "./NavBar.css";

export default function NavBar() {
  const { primaryColors, accentColors, recentlySeenStocks } =
    useStocksContext();
  return (
    <nav className={`navbar_container ${primaryColors}`}>
      <div className="navbar_logo_container">
        <div className={`hamburger_menu ${primaryColors}`}>
          <AsideDrawer />
        </div>
        <h1 className={`navbar_logo colors ${accentColors}`}>
          {" "}
          Stock Dashboard
        </h1>
      </div>

      {recentlySeenStocks.map((stock) => (
        <RecentlySeenStock key={stock.stockOverview.symbol} stock={stock} />
      ))}
    </nav>
  );
}
