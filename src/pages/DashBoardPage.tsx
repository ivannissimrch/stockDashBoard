import ChartContainer from "../components/ChartContainer/ChartContainer";
import DisplayStockOverview from "../components/DisplayStockOverview/DisplayStockOverview";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";
import Button from "../components/Button/Button";
import Chart from "../components/Chart";
import DisplayStockDetails from "../components/DisplayStockDetails/DisplayStockDetails";
import { useContext } from "react";
import { stockContext } from "../App";
import "./DashBoardPage.css";
export default function DashBoardPage() {
  const {
    stockHistoricalData,
    updateToSevenDays,
    updateToSixWeeks,
    updateToFiveMonths,
  } = useContext(stockContext);
  return (
    <section className="dashboard_page_container">
      <ChartContainer>
        <DisplayStockOverview />
        <hr className="chart_line" />
        <ButtonGroup>
          <Button
            onClick={updateToSevenDays}
            active={`${
              stockHistoricalData?.length === 7 ? "button_active" : ""
            }`}
          >
            7 days
          </Button>
          <Button
            onClick={updateToSixWeeks}
            active={`${
              stockHistoricalData?.length === 6 ? "button_active" : ""
            }`}
          >
            6 Weeks
          </Button>
          <Button
            onClick={updateToFiveMonths}
            active={`${
              stockHistoricalData?.length === 5 ? "button_active" : ""
            }`}
          >
            5 months
          </Button>
        </ButtonGroup>
        <Chart />
      </ChartContainer>
      <DisplayStockDetails />
    </section>
  );
}
