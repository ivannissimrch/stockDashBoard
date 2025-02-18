import { useContext } from "react";
import { stockContext } from "../../App";
import "./DisplayStockOverview.css";
import arrow from "../../images/stockOverview/tabler_arrow-narrow-down.svg";

export default function DisplayStockOverview() {
  const { stockOverview, stockDetails } = useContext(stockContext);
  const { symbol = "", price = "", changePercent = "" } = stockOverview || {};
  const isNegativeChange = +changePercent < 0;

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
          <div className="change_percent_container">
            <span className="place_holder"></span>
            <span className="percent_text">{`${changePercent}%`}</span>

            <img
              src={arrow}
              className={`${isNegativeChange ? "percent_arrow_down" : ""}`}
            />
          </div>

          <span className="price">{`$${price}`}</span>
        </div>
        <div className="last_updated"></div>
      </div>
    </section>
  );
}
