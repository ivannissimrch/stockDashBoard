import "./RecentlySeenStock.css";
import { useStocksContext } from "../StocksContextProvider";
import { RecentlySeenStocks } from "../../types";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";

export default function RecentlySeenStock({
  stock,
}: {
  stock: RecentlySeenStocks;
}) {
  const { stockOverview, stockDetails, stockData } = stock;
  const {
    deleteToRecentlySeenStocks,
    primaryColors,
    secondaryColors,
    reOrderRecentlySeenStocks,
    updateStockHistoricalData,
  } = useStocksContext();

  return (
    <button
      className={`recent_stock_overview_container ${secondaryColors}`}
      onClick={() => {
        reOrderRecentlySeenStocks(stock);
        const sevenDaysStocks = getSevenDaysStockData(stockData);
        if (sevenDaysStocks) {
          updateStockHistoricalData(sevenDaysStocks);
        }
      }}
    >
      <img className="recent_logo" src={stockDetails.logo} alt="company logo" />
      <h4 className="recent_name ">{stockDetails.name}</h4>
      <h4 className="recent_price">{`$${stockOverview.price}`}</h4>

      <DeleteForeverSharpIcon
        sx={{ color: `${primaryColors}` }}
        onClick={(event) => {
          event.stopPropagation();
          deleteToRecentlySeenStocks(stock);
        }}
      />
    </button>
  );
}
