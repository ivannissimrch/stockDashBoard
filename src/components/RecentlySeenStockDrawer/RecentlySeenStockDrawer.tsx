import "./RecentlySeenStockDrawer.css";
import { useStocksContext } from "../StocksContextProvider";
import { RecentlySeenStocks } from "../../types";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";

interface stocksProps {
  stock: RecentlySeenStocks;
}

export default function RecentlySeenStockDrawer({ stock }: stocksProps) {
  const {
    deleteFromRecentlySeenStocks,
    primaryColors,
    secondaryColors,
    reOrderRecentlySeenStocks,
    updateStockHistoricalData,
  } = useStocksContext();

  const { stockDetails, stockData } = stock;

  function handleClick() {
    reOrderRecentlySeenStocks(stock);
    const sevenDaysStocks = getSevenDaysStockData(stockData);
    updateStockHistoricalData(sevenDaysStocks);
  }

  return (
    <button
      className={`recent_stock_drawer_overview_container ${secondaryColors}`}
      onClick={handleClick}
    >
      <img
        className="recent_stock_drawer_logo"
        src={stockDetails.logo}
        alt="company logo"
      />
      <h4 className="recent_stock_drawer_name ">{stockDetails.name}</h4>
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
