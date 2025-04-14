import "./RecentlySeenStock.css";
import { useStocksContext } from "../StocksContextProvider";
import { RecentlySeenStocks } from "../../types";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

export default function RecentlySeenStock({
  stock,
}: {
  stock: RecentlySeenStocks;
}) {
  const { price, logo, name } = stock;
  const { deleteToRecentlySeenStocks, primaryColors, secondaryColors } =
    useStocksContext();

  return (
    <button className={`recent_stock_overview_container ${secondaryColors}`}>
      <img className="recent_logo" src={logo} alt="company logo" />
      <h4 className="recent_name ">{name}</h4>
      <h4 className="recent_price">{`$${price}`}</h4>

      <DeleteForeverSharpIcon
        sx={{ color: `${primaryColors}` }}
        onClick={() => deleteToRecentlySeenStocks(stock)}
      />
    </button>
  );
}
