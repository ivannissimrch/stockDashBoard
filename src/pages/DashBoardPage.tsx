import DisplayStockOverview from "../components/DisplayStockOverview/DisplayStockOverview";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";

import Chart from "../components/Chart";
import DisplayStockDetails from "../components/DisplayStockDetails/DisplayStockDetails";
import "./DashBoardPage.css";
import { useStocksContext } from "../components/StocksContextProvider";
import NoData from "./NoData";
import SecondaryDashboardPageContainer from "../components/SecondaryDashboardPageContainer/SecondaryDashboardPageContainer";
import { useEffect } from "react";
import fetchQuote from "../helpers/fetchQuote";

export default function DashBoardPage() {
  const { recentlySeenStocks, secondaryColors, upDateRecentlySeenStocks } =
    useStocksContext();
  const currentStock = recentlySeenStocks[0];
  console.log(currentStock, "curent stock");

  useEffect(() => {
    if (!currentStock) {
      return;
    }

    //Historical data update once a day
    const stockDataDates = Object.keys(currentStock.stockData);
    const stockHistoricalDataDate = stockDataDates[0];
    console.log(
      "last date upadate from stock historical data from alpha vantage",
      stockHistoricalDataDate
    );
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const todaysDate = `${year}-${month}-${day}`;

    //if srock historical data older than two days update
    console.log("Last date is supossed to be one day behind current date");
    // updateStockData(stock.stockOverview.symbol);
    // setLastUpdateDateFromLocal(todaysDate);

    //Historical data update once a day

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifferenceInMinutes =
        (currentTime - currentStock.lastUpdated) / (1000 * 60);
      console.log("Time since last update", timeDifferenceInMinutes);

      if (timeDifferenceInMinutes > 10) {
        fetchQuote(currentStock.stockOverview.symbol).then((data) => {
          console.log(data);
          const updatedStock = {
            ...currentStock,
            lastUpdated: Date.now(),
            stockOverview: {
              ...currentStock.stockOverview,
              price: data.c,
              changePercent: data.dp,
            },
          };
          upDateRecentlySeenStocks(updatedStock);
        });
      }
    }, 30000); //repeat every 30 seconds
    return () => {
      clearInterval(intervalId);
    };
  }, [currentStock, upDateRecentlySeenStocks]);

  return (
    <main className={`dashboard_page_container ${secondaryColors}`}>
      {recentlySeenStocks.length > 0 ? (
        <>
          <SecondaryDashboardPageContainer>
            <DisplayStockOverview />
            <hr className="chart_line" />
            <ButtonGroup />
            <Chart />
          </SecondaryDashboardPageContainer>
          <DisplayStockDetails />
        </>
      ) : (
        <NoData />
      )}
    </main>
  );
}
