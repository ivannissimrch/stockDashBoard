import { afterEach, expect, it } from "vitest";
import getStoredDataFromStorage from "./getStoredDataFromStorage";
const storedData = {
  "2024-11-19": {
    "1. open": "226.9800",
    "2. high": "230.1600",
    "3. low": "226.6600",
    "4. close": "228.2800",
  },
  "2024-07-01": {
    "1. open": "212.0900",
    "2. high": "217.5100",
    "3. low": "211.9200",
    "4. close": "216.7500",
  },
};

afterEach(() => {
  localStorage.clear();
});

it("handles invalid JSON dat", () => {
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
