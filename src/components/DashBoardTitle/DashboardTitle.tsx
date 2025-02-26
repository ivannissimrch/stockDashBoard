import "./DashboardTitle.css";
import { ReactNode, useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { stockContext } from "../../App";

export default function DashboardTitle({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const { isDarkMode } = useContext(stockContext);

  return (
    <div className="dashboard_title_container">
      <h2 className="dashboard_title">{children}</h2>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={onClick}
        className="title_icon"
      />
    </div>
  );
}
