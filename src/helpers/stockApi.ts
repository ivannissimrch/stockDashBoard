const apiKey = "crf2qk1r01qk4jsaq0agcrf2qk1r01qk4jsaq0b0";
const basePath = "https://finnhub.io/api/v1";

type ApiStockResults = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

type StockDetails = {
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
};

export async function getStocksData(
  userQuery: string
): Promise<ApiStockResults[]> {
  try {
    const url = `${basePath}/search?q=${userQuery}&exchange=US&token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    return results.result;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export async function fetchStockDetails(
  stockSymbol: string
): Promise<StockDetails | undefined> {
  try {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error: unknown) {
    console.log(error);
  }
}
