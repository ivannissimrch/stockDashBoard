import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto";
import StocksContextProvider from "./components/StocksContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StocksContextProvider>
      <App />
    </StocksContextProvider>
  </StrictMode>
);
