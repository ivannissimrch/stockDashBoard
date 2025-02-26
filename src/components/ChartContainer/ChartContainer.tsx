import { stockContext } from "../../App";
import "./ChartContainer.css";
import { ReactNode, useContext } from "react";

export default function ChartContainer({ children }: { children: ReactNode }) {
  const { containersColors } = useContext(stockContext);

  return (
    <section className={`chart_container ${containersColors}`}>
      {children}
    </section>
  );
}
