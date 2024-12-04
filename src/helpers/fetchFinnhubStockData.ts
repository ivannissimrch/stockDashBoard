export async function fetchFinnhubStockData<T>(
  url: string
): Promise<T | undefined> {
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
