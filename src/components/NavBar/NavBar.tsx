import { useThemeContext } from "../../ThemeContext";
import AsideDrawer from "../Drawer/AsideDrawer";
import RecentlySeenStock from "../RecentlySeenStock/RecentlySeenStock";
import { useRecentlySeenStocksContext } from "../../contexts/RecentlySeenStocksContext";
import "./NavBar.css";

export default function NavBar() {
  const { recentlySeenStocks } = useRecentlySeenStocksContext();
  const { primaryColors, accentColors } = useThemeContext();

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
