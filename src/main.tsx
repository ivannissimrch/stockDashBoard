import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto";
import RecentlySeenStocksProvider from "./contexts/RecentlySeenStocksContext.tsx";
import HistoricalDataProvider from "./contexts/HistoricalDataContext.tsx";
import ThemeContextProvider from "./ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecentlySeenStocksProvider>
      <HistoricalDataProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </HistoricalDataProvider>
    </RecentlySeenStocksProvider>
  </StrictMode>
);
