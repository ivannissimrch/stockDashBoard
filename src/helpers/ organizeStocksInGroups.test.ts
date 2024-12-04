import { expect, it } from "vitest";
import organizeStocksInGroups from "./organizedStocksInGroups";
import { GroupType } from "./organizedStocksInGroups";
import getStoredDataFromStorage from "./getStoredDataFromStorage";

// const FOR_WEEKS_OF_STOCKS = [
//   [
//     { closingPrices: 237.33, date: "Week 48" },
//     { closingPrices: 237.33, date: "Week 48" },
//   ],
//   [
//     { closingPrices: 237.33, date: "Week 47" },
//     { closingPrices: 237.33, date: "Week 47" },
//   ],
//   [
//     { closingPrices: 237.33, date: "Week 46" },
//     { closingPrices: 237.33, date: "Week 46" },
//   ],
//   [
//     { closingPrices: 237.33, date: "Week 45" },
//     { closingPrices: 237.33, date: "Week 43" },
//   ],
// ];

it("it should return stocks organized in group", () => {
  const stockDataFromStorage = getStoredDataFromStorage();
  if (stockDataFromStorage) {
    const twoMonthsOfStocks = organizeStocksInGroups(GroupType.Month, 2);
    expect(twoMonthsOfStocks).toHaveLength(2);

    const fourWeeksOfStocks = organizeStocksInGroups(GroupType.Week, 4);
    expect(fourWeeksOfStocks).toHaveLength(4);
  }
});
