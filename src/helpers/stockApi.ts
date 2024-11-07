import { getWeekNumber } from "./getWeekNumber";

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

interface StockSymbols {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface StockDetails {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export interface StockQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface DailyMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

export interface WeekMonthMetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Time Zone": string;
}

export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface DailyStocksApiResponse {
  "Meta Data": DailyMetaData;
  "Time Series (Daily)": { [key: string]: StockTimeSeries };
}

export interface WeekMonthlySeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface WeeklyStocksApiResponse {
  "Meta Data": WeekMonthMetaData;
  "Weekly Time Series": { [key: string]: StockTimeSeries };
}

export interface MonthlyStocksApiResponse {
  "Meta Data": WeekMonthMetaData;
  "Monthly Time Series": { [key: string]: StockTimeSeries };
}

export interface StocksData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
  date: string;
  symbol: string;
}

async function fetchFinnhubStockData<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results;
  } catch (error: unknown) {
    console.log(error);
    return undefined;
  }
}

export async function fetchStocksSymbols(
  userQuery: string
): Promise<StockSymbols[]> {
  const url = `${FINNHUB_BASE_URL}/search?q=${userQuery}&exchange=US&token=${FINNHUB_API_KEY}`;
  console.log(url);
  const results = await fetchFinnhubStockData<{ result: StockSymbols[] }>(url);
  if (!results) {
    return [];
  }
  return results.result;
}

export async function fetchStockDetails(
  stockSymbol: string
): Promise<StockDetails | undefined> {
  const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  return await fetchFinnhubStockData<StockDetails>(url);
}

export async function fetchQuote(
  stockSymbol: string
): Promise<StockQuote | undefined> {
  const url = `${FINNHUB_BASE_URL}/quote?symbol=${stockSymbol}&token=${FINNHUB_API_KEY}`;
  return await fetchFinnhubStockData<StockQuote>(url);
}

async function fetchVantageStocksData<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function fetchDailyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  const results = await fetchVantageStocksData<DailyStocksApiResponse>(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  if (!results) {
    return;
  }
  const stocksWithDatesObjects = results["Time Series (Daily)"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];

  const oneWeekKeys = stockWithDateObjectsKeys.filter((_stock, idx) => idx < 7);
  const oneWeekStocks: StocksData[] = oneWeekKeys.map((key) => {
    return {
      ...stocksWithDatesObjects?.[key],
      date: key,
      symbol: symbol,
    };
  });
  return oneWeekStocks;
}

export async function fetchWeeklyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  //get last 6 weeks on weekly steps
  const results = await fetchVantageStocksData<DailyStocksApiResponse>(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
  );

  if (!results) {
    return;
  }
  const stocksWithDatesObjects = results["Time Series (Daily)"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];

  //get four arrays per week of stocks data .
  const stockDataByWeek = {};
  stockWithDateObjectsKeys.forEach((dayDate) => {
    const dates = new Date(dayDate);
    const [_unusedYear, calendarWeekNumber] = getWeekNumber(dates);

    if (stockDataByWeek[`${calendarWeekNumber}`]) {
      if (Object.keys(stockDataByWeek).length > 7) {
        return;
      }
      stockDataByWeek[`${calendarWeekNumber}`].push({
        ...stocksWithDatesObjects?.[dayDate],
        date: calendarWeekNumber,
        symbol: symbol,
      });
    } else {
      stockDataByWeek[calendarWeekNumber] = [
        {
          ...stocksWithDatesObjects?.[dayDate],
          date: calendarWeekNumber,
          symbol: symbol,
        },
      ];
    }
  });

  //get sixWeeksStocks
  const validWeekKeys = Object.keys(stockDataByWeek).filter((stock) => {
    const lastSixWeeksNumbers = stockDataByWeek[`${stock}`].length > 2;
    return lastSixWeeksNumbers;
  });
  const SixWeeksStocks = validWeekKeys.map(
    (indexMonth) => stockDataByWeek[`${indexMonth}`]
  );

  //calculate six weeks of stocks close average
  const sixWeeksStocksData = SixWeeksStocks.map((sixWeeksData) => {
    const weekCloseAverages = sixWeeksData.reduce(
      (total, currentWeek) => {
        const closeValue = parseFloat(currentWeek["4. close"]);

        return {
          close: total?.close + closeValue,
          "4. close": (total?.close + closeValue) / sixWeeksData.length,
          date: `week ${currentWeek.date}`,
          symbol: symbol,
        };
      },
      { close: 0, closeAverages: 0, date: "", symbol: "" }
    );
    return weekCloseAverages;
  });

  //return six weeks stocks with the averages of closes
  return sixWeeksStocksData;
}

export async function fetchMonthlyStockData(
  symbol: string
): Promise<StocksData[] | undefined> {
  const results = await fetchVantageStocksData<DailyStocksApiResponse>(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
  );

  if (!results) {
    return;
  }
  const stocksWithDatesObjects = results["Time Series (Daily)"];
  const stockWithDateObjectsKeys = stocksWithDatesObjects
    ? Object.keys(stocksWithDatesObjects)
    : [];

  //get five arrays, one per month of stocks data
  const stockDataByMonth = {};
  stockWithDateObjectsKeys.forEach((dayDate) => {
    const dates = new Date(dayDate);
    const monthName = dates.toLocaleString("default", {
      month: "short",
    });

    if (stockDataByMonth[`${monthName}`]) {
      if (Object.keys(stockDataByMonth).length > 6) {
        return;
      }
      stockDataByMonth[`${monthName}`].push({
        ...stocksWithDatesObjects?.[dayDate],
        date: monthName,
        symbol: symbol,
      });
    } else {
      stockDataByMonth[monthName] = [
        {
          ...stocksWithDatesObjects?.[dayDate],
          date: monthName,
          symbol: symbol,
        },
      ];
    }
  });

  const fiveMonthsKeys = Object.keys(stockDataByMonth).filter((stock) => {
    const isFivemonths = stockDataByMonth[`${stock}`].length > 2;
    return isFivemonths;
  });
  const fiveMonthsDailyData = fiveMonthsKeys.map(
    (indexMonth) => stockDataByMonth[`${indexMonth}`]
  );

  //calculate closes average per month and return array of 5 objects 1 object per month
  const fiveMonthAveragesData = fiveMonthsDailyData.map((monthArray) => {
    const combinedMonthData = monthArray.reduce(
      (total, currentMonth) => {
        const closeValue = parseFloat(currentMonth["4. close"]);

        return {
          close: total?.close + closeValue,
          "4. close": (total?.close + closeValue) / monthArray.length,
          date: currentMonth.date,
          symbol: symbol,
        };
      },
      { close: 0, closeAverages: 0, date: "", symbol: "" }
    );
    return combinedMonthData;
  });

  //return array with five months of close average.
  return fiveMonthAveragesData;
}
