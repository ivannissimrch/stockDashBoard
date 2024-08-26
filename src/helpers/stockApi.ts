const apiKey = "cr2ke9pr01qgsq6me71gcr2ke9pr01qgsq6me720";
const basePath = "https://finnhub.io/api/v1";

export const getStocksData = async (userQuery: string): Promise<object[]> => {
  const url = `${basePath}/search?q=${userQuery}&token=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  const results = await response.json();
  return results.result;
};
