import { afterEach, expect, it } from "vitest";
import getStoredDataFromStorage from "./getStoredDataFromStorage";
import { MOCK_STOCK_DATA } from "./mockStoredStockData";

const storedData = MOCK_STOCK_DATA;
afterEach(() => {
  localStorage.clear();
});

it("handles invalid JSON data", () => {
  localStorage.setItem("storedStocksData", "invalid");
  expect(getStoredDataFromStorage()).toBeUndefined();
});

it("returns null if storage is empty", () => {
  expect(getStoredDataFromStorage()).toBeNull();
});

it("gets stock data from LocalStorage", () => {
  localStorage.setItem("storedStocksData", JSON.stringify(storedData));
  expect(getStoredDataFromStorage()).toStrictEqual(storedData);
});
