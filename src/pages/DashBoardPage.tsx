import DisplayStockOverview from "../components/DisplayStockOverview/DisplayStockOverview";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";

import Chart from "../components/Chart";
import DisplayStockDetails from "../components/DisplayStockDetails/DisplayStockDetails";
import "./DashBoardPage.css";
import { useStocksContext } from "../components/StocksContextProvider";
import NoData from "./NoData";
import SecondaryDashboardPageContainer from "../components/SecondaryDashboardPageContainer/SecondaryDashboardPageContainer";

export default function DashBoardPage() {
  const { stockHistoricalData, secondaryColors } = useStocksContext();

  return (
    <main className={`dashboard_page_container ${secondaryColors}`}>
      {stockHistoricalData ? (
        <>
          <SecondaryDashboardPageContainer>
            <DisplayStockOverview />
            <hr className="chart_line" />
            <ButtonGroup />
            <Chart />
          </SecondaryDashboardPageContainer>
          <DisplayStockDetails />
        </>
      ) : (
        <NoData />
      )}
    </main>
  );
}
