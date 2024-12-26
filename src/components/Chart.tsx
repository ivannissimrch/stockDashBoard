import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { stockContext } from "../App";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import getFiveMonthsStockData from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";
import getStoredDataFromStorage from "../helpers/getStoredDataFromStorage";
import Button from "./Button/Button";
import ButtonGroup from "./ButtonGroup/ButtonGroup";

export default function Chart() {
  const stocksData = getStoredDataFromStorage();

  const { stockHistoricalData, updateStockHistoricalData } =
    useContext(stockContext);

  function updateToSevenDays() {
    const sevenDaysOfStock = getSevenDaysStockData(stocksData!);
    if (sevenDaysOfStock) {
      updateStockHistoricalData(sevenDaysOfStock);
    }
  }
  function updateToSixWeeks() {
    const sixWeeksOfStocks = getSixWeeksStockData(stocksData!);
    if (sixWeeksOfStocks) {
      updateStockHistoricalData(sixWeeksOfStocks);
    }
  }
  function updateToFiveMonths() {
    const fiveMonthsOfStocks = getFiveMonthsStockData(stocksData!);
    if (fiveMonthsOfStocks) {
      updateStockHistoricalData(fiveMonthsOfStocks);
    }
  }

  function renderChart() {
    if (!stockHistoricalData) {
      return <div></div>;
    }
    const closingPrices = stockHistoricalData.map((data) => {
      return data.closingPrices;
    });
    const chartDataset = stockHistoricalData.map((data) => {
      return {
        date: data.date,
      };
    });

    return (
      <LineChart
        dataset={chartDataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "date",
            valueFormatter: (date: string) => date,
          },
        ]}
        series={[{ data: closingPrices, baseline: "min" }]}
        sx={{ maxWidth: 700, maxHeight: 420 }}
      />
    );
  }

  return (
    <div>
      <ButtonGroup>
        {/* <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        fullWidth
      > */}
        <Button onClick={updateToSevenDays}>7 days</Button>
        <Button onClick={updateToSixWeeks}>6 Weeks</Button>
        <Button onClick={updateToFiveMonths}>5 months</Button>
        {/* </ButtonGroup>{" "} */}
      </ButtonGroup>
      {renderChart()}
    </div>
  );
}
