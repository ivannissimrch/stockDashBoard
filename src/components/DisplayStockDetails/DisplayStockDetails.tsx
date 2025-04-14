import Skeleton from "@mui/material/Skeleton";
import { useStocksContext } from "../StocksContextProvider";
import "./DisplayStockDetails.css";

export default function DisplayStockDetails() {
  const { stockDetails, containersColors, isStocksInfoLoading } =
    useStocksContext();
  const {
    country = "",
    currency = "",
    exchange = "",
    ipo = "",
    marketCapitalization = "",
    finnhubIndustry = "",
  } = stockDetails || {};
  return (
    <section className={`stock_details_container ${containersColors}`}>
      {isStocksInfoLoading ? (
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
