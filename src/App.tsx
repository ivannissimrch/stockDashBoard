import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import DashBoardPage from "./pages/DashBoardPage.js";
import NavBar from "./components/NavBar/NarBar.js";
import DashboardTitle from "./components/DashBoardTitle/DashboardTitle.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
import { createTheme } from "@mui/material";
import { useStocksContext } from "./components/StocksContextProvider.js";

export default function App() {
  const { isDarkMode, secondaryColors } = useStocksContext();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <main className={`app-main-container ${secondaryColors}`}>
        <aside className="app-navbar-container">
          <NavBar />
        </aside>
        <section className="app-section-container">
          <SearchBar />
          <DashboardTitle />
          <DashBoardPage />
        </section>
      </main>
    </ThemeProvider>
  );
}
