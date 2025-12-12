import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import DashBoardPage from "./pages/DashBoardPage";
import NavBar from "./components/NavBar/NavBar";
import DashboardTitle from "./components/DashBoardTitle/DashboardTitle";
import SearchBar from "./components/SearchBar/SearchBar";
import { createTheme } from "@mui/material";
import { useThemeContext } from "./ThemeContext";

export default function App() {
  const { isDarkMode, secondaryColors } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
