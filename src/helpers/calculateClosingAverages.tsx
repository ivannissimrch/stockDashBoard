import { StocksData } from "./stockApi";

export default function calculateClosingAverages(
  stocksDailyData: StocksData[][]
) {
  const stocksPeriodAverages = stocksDailyData.map((stocksData) => {
    const { closingPrices, date } = stocksData.reduce(
      (total, currentStock) => {
        const closeValue = currentStock.closingPrices;

        return {
          closingPrices: total.closingPrices + closeValue,
          date: currentStock.date,
        };
      },
      { closingPrices: 0, date: "" }
    );

    const averageClosingPrice = closingPrices / stocksData.length;
    return {
      closingPrices: averageClosingPrice,
      date: date,
    };
  });
  return stocksPeriodAverages;
}
