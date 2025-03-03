import { useContext } from "react";
import { stockContext } from "../App";
import RecentlySeenStock from "../components/RecentlySeenStock/RecentlySeenStock";
import "./HomePage.css";

export default function HomePage() {
  const { recentlySeenStocks, containersColors } = useContext(stockContext);
  return (
    <main className={`home_page_main_container ${containersColors}`}>
      {recentlySeenStocks.map((stock) => (
        <RecentlySeenStock key={stock.symbol} stock={stock} />
      ))}
    </main>
  );
}
