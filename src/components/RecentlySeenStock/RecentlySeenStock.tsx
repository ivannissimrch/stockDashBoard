import "./RecentlySeenStock.css";
import { useRecentlySeenStocksContext } from "../../contexts/RecentlySeenStocksContext";
import { useHistoricalDataContext } from "../../contexts/HistoricalDataContext";
import { RecentlySeenStocks } from "../../types";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import getSevenDaysStockData from "../../helpers/getSevenDaysStockData";
import { useThemeContext } from "../../ThemeContext";

export default function RecentlySeenStock({ stock }: { stock: RecentlySeenStocks }) {
  const { deleteFromRecentlySeenStocks, reOrderRecentlySeenStocks } =
    useRecentlySeenStocksContext();
  const { updateStockHistoricalData } = useHistoricalDataContext();
  const { primaryColors, secondaryColors } = useThemeContext();

  const { stockDetails, stockData } = stock;

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
