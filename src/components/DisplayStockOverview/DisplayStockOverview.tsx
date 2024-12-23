import { useContext } from "react";
import { stockContext } from "../../App";
import "./DisplayStockOverview.css";

export default function DisplayStockOverview() {
  const { stockOverview } = useContext(stockContext);
  const {
    symbol = "",
    price = "",
    change = "",
    changePercent = "",
  } = stockOverview || {};
  return (
    <section className="stock_overview_container">
      <div className="name_symbol_container">
        <span className="stock_overview_item stock_overview_name ">
          Apple Inc
        </span>
        <span className="stock_overview_item  ">{symbol}</span>
      </div>

      <div>
        <span className="stock_overview_item ">{`$${price} USD`}</span>
        <span className="stock_overview_item s ">
          {change}
          {`(${changePercent}%)`}
        </span>
      </div>
    </section>
  );
}
