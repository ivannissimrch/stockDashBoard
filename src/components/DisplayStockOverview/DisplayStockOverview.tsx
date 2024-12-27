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
          <span className="stock_overview_item stock_overview_name ">
            {stockDetails?.name}
          </span>
          <span className="stock_overview_item ">{symbol}</span>
        </div>
      </div>

      <div>
        <span className="stock_overview_item change_percent">{`${changePercent}%`}</span>
        <span className="stock_overview_item">{`$${price} USD`}</span>
      </div>
    </section>
  );
}
