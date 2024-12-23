import "./DashboardTitle.css";
import { ReactNode } from "react";

export default function DashboardTitle({ children }: { children: ReactNode }) {
  return <h2 className="dash_board_title">{children}</h2>;
}
