import { Box, Button, ButtonGroup } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { stockContext } from "../App";
import getSixWeeksStockData from "../helpers/getSixWeeksStockData";
import { getFiveMonthsStockData } from "../helpers/getFiveMonthsStockData";
import getSevenDaysStockData from "../helpers/getSevenDaysStockData";

export default function Chart() {
  const { stockHistoricalData, updateStockHistoricalData } =
    useContext(stockContext);

  function updateChartWeek() {
    updateStockHistoricalData(getSevenDaysStockData);
  }
  function updateChartMonth() {
    updateStockHistoricalData(getSixWeeksStockData);
  }
  function updateChartYear() {
    updateStockHistoricalData(getFiveMonthsStockData);
  }

  function renderChart() {
    if (!stockHistoricalData) {
      return <div></div>;
    }
    const closingPrices = stockHistoricalData.map((data) => {
      return parseFloat(data?.["4. close"]);
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
    <Box border="1px solid #cccc" height="470px" max-width={650}>
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        fullWidth
      >
        <Button
          onClick={updateChartWeek}
          color={stockHistoricalData?.length === 7 ? "info" : "primary"}
        >
          7 days
        </Button>
        <Button
          onClick={updateChartMonth}
          color={stockHistoricalData?.length === 6 ? "info" : "primary"}
        >
          6 Weeks
        </Button>
        <Button
          onClick={updateChartYear}
          color={stockHistoricalData?.length === 5 ? "info" : "primary"}
        >
          5 months
        </Button>
      </ButtonGroup>{" "}
      {renderChart()}
    </Box>
  );
}
