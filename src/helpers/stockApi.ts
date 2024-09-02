const apiKey = "Replace with own api key";
const basePath = "https://finnhub.io/api/v1";

type ApiStockResults = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export async function getStocksData(
  userQuery: string
): Promise<ApiStockResults[]> {
  try {
    const url = `${basePath}/search?q=${userQuery}&token=${apiKey}`;
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
