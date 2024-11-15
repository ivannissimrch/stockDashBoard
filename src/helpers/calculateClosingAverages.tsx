import { StocksData } from "./stockApi";

export default function calculateClosingAverages(
  stocksDailyData: StocksData[][]
) {
  const stocksPeriodAverages = stocksDailyData.map((stocksData) => {
    const closingAverages = stocksData.reduce(
      (total, currentStock) => {
        const closeValue = currentStock.closingPrices;

        return {
          closingPrices: (total.closingPrices + closeValue) / stocksData.length,
          date: currentStock.date,
        };
      },
      { closingPrices: 0, date: "" }
    );
    return closingAverages;
  });
  return stocksPeriodAverages;
}
