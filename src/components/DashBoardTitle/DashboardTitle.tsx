import "./DashboardTitle.css";
import { ReactNode } from "react";
import darkMode from "../../images/dashboardTitle/Dark mode.jpg";

export default function DashboardTitle({
  children,
  onClick,
}: {
  children: ReactNode;
}) {
  return (
    <div className="dashboard_title_container">
      <h2 className="dashboard_title">{children}</h2>
      <img src={darkMode} className="title_icon" onClick={onClick} />
    </div>
  );
}
