import Skeleton from "@mui/material/Skeleton";
import { useRecentlySeenStocksContext } from "../../contexts/RecentlySeenStocksContext";
import "./DisplayStockDetails.css";
import { useThemeContext } from "../../ThemeContext";

export default function DisplayStockDetails() {
  const { recentlySeenStocks, isRecentlySeenLoading } = useRecentlySeenStocksContext();
  const { containersColors } = useThemeContext();
  const {
    country = "",
    currency = "",
    exchange = "",
    ipo = "",
    marketCapitalization = "",
    finnhubIndustry = "",
  } = recentlySeenStocks[0].stockDetails || {};
  return (
    <section className={`stock_details_container ${containersColors}`}>
      {isRecentlySeenLoading ? (
        <>
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
          <Skeleton width="100%" height="20%" />
        </>
      ) : (
        <div className="stock_details_secondary_container">
          <h3 className="stock_details_title">Company Information</h3>
          <div className="list_container">
            <ul className="stock_details_list_left">
              <li>Country</li>
              <li>Currency</li>
              <li>Exchange</li>
              <li>IPO Date</li>
              <li>Market Capitalization</li>
              <li>Industry</li>
            </ul>

            <ul className="stock_details_list_right">
              <li>{country}</li>
              <li>{currency}</li>
              <li>{exchange}</li>
              <li>{ipo}</li>
              <li>{marketCapitalization}</li>
              <li>{finnhubIndustry}</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
