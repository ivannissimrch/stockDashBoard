import "./RecentlySeenStock.css";
import { useStocksContext } from "../StocksContextProvider";
import { RecentlySeenStocks } from "../../types";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";

interface stocksProps {
  stock: RecentlySeenStocks;
}

export default function RecentlySeenStock({ stock }: stocksProps) {
  // async function updateStockData(stockSymbol: string) {
  //   const [selectedStockDetails, stockQuote, stockDailyData] =
  //     await fetchAllDataForStocks(stockSymbol);
  //   if (stockQuote && selectedStockDetails) {
  //     const stockOverview = {
  //       symbol: stockSymbol,
  //       price: stockQuote.pc,
  //       change: stockQuote.d,
  //       changePercent: stockQuote.dp,
  //       currency: selectedStockDetails.currency,
  //     };

  //     upDateRecentlySeenStocks({
  //       active: true,
  //       stockOverview: stockOverview,
  //       stockDetails: selectedStockDetails,
  //       stockData: stockDailyData,
  //     });
  //   }
  // }

  const {
    deleteFromRecentlySeenStocks,
    primaryColors,
    secondaryColors,
    reOrderRecentlySeenStocks,
    updateStockHistoricalData,
  } = useStocksContext();

  const { stockDetails, stockData } = stock;
  // const stockDataDates = Object.keys(stockData);
  // const lastUpdateDateFromApi = stockDataDates[0];

  // const [lastUpdateDateFromLocal, setLastUpdateDateFromLocal] =
  //   usePersistedState("lastUpdateDateFromLocal", lastUpdateDateFromApi);

  // const today = new Date();
  // const day = String(today.getDate()).padStart(2, "0");
  // const month = String(today.getMonth() + 1).padStart(2, "0");
  // const year = today.getFullYear();
  // const todaysDate = `${year}-${month}-${day}`;

  // if (lastUpdateDateFromLocal !== todaysDate) {
  //   console.log("fetch and update values");
  //   updateStockData(stock.stockOverview.symbol);
  //   setLastUpdateDateFromLocal(todaysDate);
  // }

  function handleClick() {
    reOrderRecentlySeenStocks(stock);
    const sevenDaysStocks = getSevenDaysStockData(stockData);
    updateStockHistoricalData(sevenDaysStocks);
  }

  return (
    <button
      className={`recent_stock_overview_container ${secondaryColors}`}
      onClick={handleClick}
    >
      <img className="recent_logo" src={stockDetails.logo} alt="company logo" />
      <h4 className="recent_name ">{stockDetails.name}</h4>
      {/* <h4 className="recent_price">{`$${stockOverview.price}`}</h4> */}

      <DeleteForeverSharpIcon
        sx={{ color: `${primaryColors}` }}
        onClick={(event) => {
          event.stopPropagation();
          deleteFromRecentlySeenStocks(stock);
        }}
      />
    </button>
  );
}
