import { useContext } from "react";
import { stockContext } from "../../App";
import "./DisplayStockDetails.css";

export default function DisplayStockDetails() {
  const { stockDetails, containersColors } = useContext(stockContext);
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
    </section>
  );
}
