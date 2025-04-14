import { useStocksContext } from "../StocksContextProvider";
import "./DashboardTitle.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DashboardTitle() {
  const { isDarkMode, implementDarkMode, secondaryColors } = useStocksContext();
  return (
    <div className={`dashboard_title_container ${secondaryColors}`}>
      <h2 className="dashboard_title">Dashboard</h2>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={implementDarkMode}
        className="title_icon"
      />
    </div>
  );
}
