import DisplayStockOverview from "../components/DisplayStockOverview/DisplayStockOverview";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";
import Chart from "../components/Chart";
import DisplayStockDetails from "../components/DisplayStockDetails/DisplayStockDetails";
import "./DashBoardPage.css";
import { useRecentlySeenStocksContext } from "../contexts/RecentlySeenStocksContext";
import NoData from "./NoData";
import SecondaryDashboardPageContainer from "../components/SecondaryDashboardPageContainer/SecondaryDashboardPageContainer";
import { useThemeContext } from "../ThemeContext";

export default function DashBoardPage() {
  const { recentlySeenStocks } = useRecentlySeenStocksContext();
  const { secondaryColors } = useThemeContext();

  return (
    <section className={`dashboard_page_container ${secondaryColors}`}>
      {recentlySeenStocks.length > 0 ? (
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
    </section>
  );
}
