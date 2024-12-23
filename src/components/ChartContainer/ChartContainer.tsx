import "./ChartContainer.css";
import { ReactNode } from "react";

export default function ChartContainer({ children }: { children: ReactNode }) {
  return <section className="chart_container">{children}</section>;
}
