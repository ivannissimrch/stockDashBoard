import { useContext } from "react";
import { stockContext } from "../../App";
import "./DisplayStockDetails.css";

export default function DisplayStockDetails() {
  const { stockDetails } = useContext(stockContext);
  const {
    country = "",
    currency = "",
    exchange = "",
    ipo = "",
    marketCapitalization = "",
    finnhubIndustry = "",
  } = stockDetails || {};
  return (
    <section className="stock_details_container">
      <h3 className="stock_details_title">Company Information</h3>
      <ul className="stock_details_list">
        <li className="stock_details_list_item">
          <span className="item_left">Country</span>
          <span className="item_right">{country}</span>
        </li>
        <li className="stock_details_list_item">
          <span className="item_left">Currency</span>
          <span className="item_right">{currency}</span>
        </li>
        <li className="stock_details_list_item">
          <span className="item_left">Exchange</span>
          <span className="item_right">{exchange}</span>
        </li>
        <li className="stock_details_list_item">
          <span className="item_left">IPO Date</span>
          <span className="item_right">{ipo}</span>
        </li>
        <li className="stock_details_list_item">
          <span className="item_left">Market Capitalization</span>
          <span className="item_right">{marketCapitalization}</span>
        </li>
        <li className="stock_details_list_item">
          <span className="item_left">Industry</span>
          <span className="item_right">{finnhubIndustry}</span>
        </li>
      </ul>
    </section>
  );
}
