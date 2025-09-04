# Stocks Application

A simple application designed to search for stocks by name, view their current information, and analyze historical data.

## Features

- **Stock Search:** Search for stocks by their name.
- **Detailed Stock Information:** Access details for each stock, including:
  - Company Name
  - Company Logo
  - Stock Symbol
  - Current Market Price (Note: Refer to the "Price Updates" section below)
- **Historical Data Chart:** Visualize stock performance over various timeframes:

  - Last 7 Days
  - Last 6 Weeks (average of weekly closing prices)
  - Last 5 Months (average of monthly closing prices)

- **Recently Viewed Stocks:** A convenient sidebar displays a list of stocks you've recently checked.

- **Caching for Efficiency:** Recently viewed stock data is stored locally for quick access, reducing unnecessary API calls.

## Price Updates and Quote Information

Please note that the stock prices displayed in the application are updated every 15 minutes for the stock currently being viewed in the main section. Therefore, there may be a slight delay in the displayed price compared to real-time market values.

## How It Works

This application retrieves stock data from two financial API providers:

1. **Finnhub Stock API:** For quotes, stock overviews, and details.
2. **Alpha Vantage API:** For historical data (Finnhub does not provide historical data in the free API tier).

When you search for a stock, the application fetches and displays the latest stock information.

For historical data, the application shows the last 7 days of closing prices and calculates the closing price averages for 6 weeks and 5 months. This information is displayed on a chart, allowing you to observe trends over various periods.

### Recently Seen Feature

When a stock is searched, its information is stored in local storage. If you access the stock again from the "Recently Seen" list, the application will load data from the cache (local storage). If the cached data is not older than 15 minutes, it will be displayed without making an API request. This leads to faster load times and fewer API calls.

If the cached data is older than 15 minutes, the application will refetch the quote from the Finnhub API and update the price and change percentage.
If the cache data is older than one day, the application will refetch the historical stock data from Alpha Vantage and update the values.

## Technologies Used

- React
- Material UI
- Vitest
- TypeScript
- APIs: Alpha Vantage, Finnhub

## Setup and Installation

1. Clone the repository: `git clone git@github.com:ivannissimrch/stockDashBoard.git`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`
4. Add environment variables
   At the root folder, create a .env file

   and add the following.

VITE_FINNHUB_API_KEY = finnhub-api-key-no-quotes
VITE_ALPHA_VANTAGE_API_KEY = alpha-vantage-api-key-no-quotes

You can get your api keys from the following links:
https://finnhub.io/
https://www.alphavantage.co/

5. Run the application: `npm run dev`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.


- [ ] Add a stock buying simulation functionality.

