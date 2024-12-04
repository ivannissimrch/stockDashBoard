import { StocksData } from "./stockApi";

export default function calculateClosingAverages(
  stocksDataGroups: StocksData[][]
) {
  const stocksPeriodAverages = stocksDataGroups.map((stockGroup) => {
    const { closingPrices, date } = stockGroup.reduce(
      (total, currentStock) => {
        const closeValue = currentStock.closingPrices;

        return {
          closingPrices: total.closingPrices + closeValue,
          date: currentStock.date,
        };
      },
      { closingPrices: 0, date: "" }
    );

    const averageClosingPrice = closingPrices / stockGroup.length;
    return {
      closingPrices: averageClosingPrice,
      date: date,
    };
  });
  return stocksPeriodAverages;
}
