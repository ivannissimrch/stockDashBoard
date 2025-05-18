import "./DisplayStockOverview.css";
import arrow from "../../images/stockOverview/tabler_arrow-narrow-down.svg";
import { useStocksContext } from "../StocksContextProvider";
import { Skeleton } from "@mui/material";

export default function DisplayStockOverview() {
  const { recentlySeenStocks, isStocksInfoLoading } = useStocksContext();
  const {
    symbol = "",
    price = "",
    changePercent = "",
  } = recentlySeenStocks[0].stockOverview || {};
  const isNegativeChange = +changePercent < 0;
  const date = new Date(recentlySeenStocks[0].lastUpdated);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  console.log(hours, minutes);

  return (
    <section className="stock_overview_container">
      <div className="logo_symbol_container">
        <span className="stock_overview_item">
          {!isStocksInfoLoading ? (
            <img
              className="logo"
              src={recentlySeenStocks[0].stockDetails?.logo}
              alt="company logo"
            />
          ) : (
            <Skeleton variant="circular" width={57} height={57} />
          )}
        </span>
        <div className="symbol_name_container">
          <span className="stock_overview_name ">
            {!isStocksInfoLoading ? (
              recentlySeenStocks[0].stockDetails?.name
            ) : (
              <Skeleton variant="rounded" width={210} height={30} />
            )}
          </span>
          <span className="stock_overview_symbol">
            {!isStocksInfoLoading ? (
              symbol
            ) : (
              <Skeleton variant="rounded" width={210} height={20} />
            )}
          </span>
        </div>
      </div>
      <div className="percent_price_update_container">
        {!isStocksInfoLoading ? (
          <>
            <div className="percent_price_container">
              <div
                className={`change_percent_container ${
                  isNegativeChange ? "bg-red" : "bg-green"
                } `}
              >
                <span className="place_holder"></span>
                <span className="percent_text">{`${changePercent}%`}</span>

                <img
                  src={arrow}
                  className={`${isNegativeChange ? "percent_arrow_down" : ""}`}
                />
              </div>
              <span className="price">{`$${price}`}</span>
            </div>
            <div className="last_updated">{`Last updated at : ${hours} ${minutes}`}</div>{" "}
          </>
        ) : (
          <Skeleton variant="rounded" width={150} height={23} />
        )}
      </div>
    </section>
  );
}
