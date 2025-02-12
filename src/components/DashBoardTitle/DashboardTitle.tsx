import "./DashboardTitle.css";
import { ReactNode } from "react";

export default function DashboardTitle({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard_title_container">
      <h2 className="dashboard_title">{children}</h2>
      <img
        src="/src/images/dashboardTitle/Dark mode.jpg"
        className="title_icon"
      />
    </div>
  );
}
