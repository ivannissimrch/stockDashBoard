import { useContext } from "react";
import { stockContext } from "../../App";
import "./DisplayStockOverview.css";

export default function DisplayStockOverview() {
  const { stockOverview, stockDetails } = useContext(stockContext);
  const { symbol = "", price = "", changePercent = "" } = stockOverview || {};
  return (
    <section className="stock_overview_container">
      <div className="logo_symbol_container">
        <span className="stock_overview_item">
          {stockDetails ? (
            <img className="logo" src={stockDetails.logo} alt="company logo" />
          ) : (
            ""
          )}
        </span>
        <div className="symbol_name_container">
          <span className="stock_overview_name ">{stockDetails?.name}</span>
          <span className="stock_overview_symbol">{symbol}</span>
        </div>
      </div>

      <div className="percent_price_update_container">
        <div className="percent_price_container">
          <span className="change_percent">
            {`${changePercent}%`}
            <img src="/src/images/stockOverview/tabler_arrow-narrow-down.svg" />
          </span>
          <span className="price">{`$${price}`}</span>
        </div>
        <span className="last_updated"></span>
      </div>
    </section>
  );
}
