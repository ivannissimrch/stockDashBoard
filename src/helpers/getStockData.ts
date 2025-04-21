import { useStocksContext } from "../components/StocksContextProvider";
import fetchQuote from "./fetchQuote";
import fetchStockDetails from "./fetchStockDetails";
import fetchVantageStockData from "./fetchVantageStockData";
import getSevenDaysStockData from "./getSevenDaysStockData";

export default function useGetStockData() {
  const {
    updateStockDetails,
    updateStockOverview,
    updateStockHistoricalData,
    addToRecentlySeenStocks,
  } = useStocksContext();

  const newValue = { label: "APPLE INC AAPL", symbol: "AAPL" };

  async function getStockData() {
    if (newValue) {
      const selectedStockDetails = await fetchStockDetails(newValue.symbol);
      const stockQuote = await fetchQuote(newValue.symbol);
      if (stockQuote && selectedStockDetails) {
        const stockOverview = {
          symbol: newValue.symbol,
          price: stockQuote.pc,
          change: stockQuote.d,
          changePercent: stockQuote.dp,
          currency: selectedStockDetails.currency,
        };
        updateStockOverview(stockOverview);
        updateStockDetails(selectedStockDetails);
        addToRecentlySeenStocks({ ...stockOverview, ...selectedStockDetails });
        const stockDailyData = await fetchVantageStockData(newValue.symbol);
        const sevenDaysStocks = getSevenDaysStockData(stockDailyData!);

        if (sevenDaysStocks) {
          updateStockHistoricalData(sevenDaysStocks);
        }
      }
    }
  }

  getStockData();
}
