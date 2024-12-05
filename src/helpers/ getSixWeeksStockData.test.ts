// import { expect, it, vi, afterEach } from "vitest";
// import getSixWeeksStockData from "./getSixWeeksStockData";
// import organizeStocksInGroups from "./organizedStocksInGroups";
// import calculateClosingAverages from "./calculateClosingAverages";
// import { GroupType } from "./organizedStocksInGroups";

// //mock functions
// vi.mock("./organizedStocksInGroups", () => ({
//   default: vi.fn(),
//   GroupType: {
//     Week: "Week",
//   },
// }));

// vi.mock("./calculateClosingAverages", () => ({ default: vi.fn() }));

// const mockedSixWeeksOfStocks = [
//   [
//     { closingPrices: 237.33, date: "Week 48" },
//     { closingPrices: 234.93, date: "Week 48" },
//     { closingPrices: 235.06, date: "Week 48" },
//   ],
//   [
//     { closingPrices: 232.87, date: "Week 47" },
//     { closingPrices: 229.87, date: "Week 47" },
//     { closingPrices: 228.52, date: "Week 47" },
//     { closingPrices: 229, date: "Week 47" },
//     { closingPrices: 228.28, date: "Week 47" },
//   ],
//   [
//     { closingPrices: 228.02, date: "Week 46" },
//     { closingPrices: 225, date: "Week 46" },
//     { closingPrices: 228.22, date: "Week 46" },
//     { closingPrices: 225.12, date: "Week 46" },
//     { closingPrices: 224.23, date: "Week 46" },
//   ],
//   [
//     { closingPrices: 224.23, date: "Week 45" },
//     { closingPrices: 226.96, date: "Week 45" },
//     { closingPrices: 227.48, date: "Week 45" },
//     { closingPrices: 222.72, date: "Week 45" },
//     { closingPrices: 223.45, date: "Week 45" },
//   ],
//   [
//     { closingPrices: 222.01, date: "Week 44" },

//     { closingPrices: 222.91, date: "Week 44" },

//     { closingPrices: 225.91, date: "Week 44" },

//     { closingPrices: 230.1, date: "Week 44" },

//     { closingPrices: 233.67, date: "Week 44" },
//   ],
//   [
//     { closingPrices: 233.4, date: "Week 43" },

//     { closingPrices: 231.41, date: "Week 43" },

//     { closingPrices: 230.57, date: "Week 43" },

//     { closingPrices: 230.76, date: "Week 43" },

//     { closingPrices: 235.86, date: "Week 43" },
//   ],
// ];

// const mockedSixWeeksOfClosingAverages = [
//   {
//     closingPrices: 235.7733333333333,
//     date: "Week 48",
//   },
//   {
//     closingPrices: 229.708,
//     date: "Week 47",
//   },
//   {
//     closingPrices: 226.118,
//     date: "Week 46",
//   },
//   {
//     closingPrices: 224.968,
//     date: "Week 45",
//   },
//   {
//     closingPrices: 226.92,
//     date: "Week 44",
//   },
//   {
//     closingPrices: 232.4,
//     date: "Week 43",
//   },
// ];

// afterEach(() => {
//   vi.clearAllMocks();
// });

// it("Should return an array of objects with closing averages organize by week", () => {
//   (organizeStocksInGroups as vi.Mock).mockReturnValue(mockedSixWeeksOfStocks);
//   (calculateClosingAverages as vi.Mock).mockReturnValue(
//     mockedSixWeeksOfClosingAverages
//   );

//   const result = getSixWeeksStockData();

//   expect(organizeStocksInGroups).toHaveBeenCalledWith(GroupType.Week, 6);
//   expect(result).toHaveLength(6);
//   expect(calculateClosingAverages).toHaveBeenCalledWith(mockedSixWeeksOfStocks);
//   expect(result).toEqual(mockedSixWeeksOfClosingAverages);
// });
