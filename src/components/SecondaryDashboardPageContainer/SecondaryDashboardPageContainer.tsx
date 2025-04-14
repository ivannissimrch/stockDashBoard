import { useStocksContext } from "../StocksContextProvider";
import "./SecondaryDashboardPageContainer.css";
import { ReactNode } from "react";

export default function SecondaryDashboardPageContainer({
  children,
}: {
  children: ReactNode;
}) {
  const { containersColors } = useStocksContext();
  return (
    <section className={`SecondaryDashboardPageContainer ${containersColors}`}>
      {children}
    </section>
  );
}
