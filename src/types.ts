export interface StockOverview {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
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

export interface StocksData {
  closingPrices: number;
  date: string;
}

export interface RecentlySeenStocks {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
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

export interface ContextTypes {
  stockDetails: StockDetails | undefined;
  updateStockDetails: (newDetails: StockDetails) => void;
  stockOverview: StockOverview | undefined;
  updateStockOverview: (newStockOverview: StockOverview) => void;
  stockHistoricalData: StocksData[] | undefined;
  updateStockHistoricalData: (newDetails: StocksData[]) => void;
  primaryColors: string;
  secondaryColors: string;
  accentColors: string;
  iconColors: string;
  containersColors: string;
  isDarkMode: boolean;
  implementDarkMode: () => void;
  updateToSevenDays: () => void;
  updateToSixWeeks: () => void;
  updateToFiveMonths: () => void;
  recentlySeenStocks: RecentlySeenStocks[] | [];
  addToRecentlySeenStocks: (stockOverview: RecentlySeenStocks) => void;
  deleteToRecentlySeenStocks: (stockOverview: RecentlySeenStocks) => void;
  isStocksInfoLoading: boolean;
  setStocksInfoLoadingToFalse: () => void;
  setStocksInfoLoadingToTrue: () => void;
  stocksData: DailyStocksApiResponse | undefined;
  updateStocksData: (newDailyData: DailyStocksApiResponse) => void;
}

export interface StockTimeSeries {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface DailyStocksApiResponse {
  [key: string]: StockTimeSeries;
}

export interface StockSymbols {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
