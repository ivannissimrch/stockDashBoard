import "./DashboardTitle.css";
import { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { stockContext } from "../../App";

export default function DashboardTitle() {
  const { isDarkMode, implementDarkMode } = useContext(stockContext);

  return (
    <div className="dashboard_title_container">
      <h2 className="dashboard_title">Dashboard</h2>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={implementDarkMode}
        className="title_icon"
      />
    </div>
  );
}
