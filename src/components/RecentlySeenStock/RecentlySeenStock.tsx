import "./RecentlySeenStock.css";
import arrow from "../../images/stockOverview/tabler_arrow-narrow-down.svg";
import { RecentlySeenStocks, stockContext } from "../../App";
import { useContext } from "react";

export default function RecentlySeenStock({
  stock,
}: {
  stock: RecentlySeenStocks;
}) {
  const { symbol, price, changePercent, logo, name } = stock;
  const { deleteToRecentlySeenStocks } = useContext(stockContext);
  const isNegativeChange = +changePercent < 0;
  return (
    <section className="recent_stock_overview_container">
      <div className="logo_symbol_container">
        <span className="stock_overview_item">
          <img className="logo" src={logo} alt="company logo" />
        </span>
        <div className="symbol_name_container">
          <span className="stock_overview_name ">{name}</span>
          <span className="stock_overview_symbol">{symbol}</span>
        </div>
      </div>

      <div className="percent_price_update_container">
        <div className="percent_price_container">
          <div className="change_percent_container">
            <span className="place_holder"></span>
            <span className="percent_text">{`${changePercent}%`}</span>

            <img
              src={arrow}
              className={`${isNegativeChange ? "percent_arrow_down" : ""}`}
            />
          </div>
          <span className="price">{`$${price}`}</span>
          <button onClick={() => deleteToRecentlySeenStocks(stock)}>X</button>
        </div>
      </div>
    </section>
  );
}
