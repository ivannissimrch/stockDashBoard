import { Box, Button, ButtonGroup } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { stockContext } from "../App";
import { fetchMonthlyHistoricalData } from "../helpers/stockApi";
import { HistoricalData } from "./StockSearchInput";

export default function Chart() {
  const { stockHistoricalData, updateStockHistoricalData } =
    useContext(stockContext);
  let chartData = <div></div>;

  async function updateChart() {
    const dataForChart = await fetchMonthlyHistoricalData("IBM");
    console.log(dataForChart);
    const datesObjects = dataForChart?.["Monthly Time Series"];
    const dateObjectsKeys = datesObjects ? Object.keys(datesObjects) : [];
    const weekKeys = dateObjectsKeys.filter((_stock, idx) => idx < 3);
    const oneWeekStocks = weekKeys.map((key) => {
      return {
        ...datesObjects?.[key],
        date: key,
      } as HistoricalData;
    });
    console.log(oneWeekStocks);
    updateStockHistoricalData(oneWeekStocks);
  }

  if (stockHistoricalData) {
    const closes = stockHistoricalData.map((data) =>
      parseFloat(data?.["4. close"])
    );
    const dataset = stockHistoricalData.map((data) => ({
      date: data.date,
    }));

    chartData = (
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "date",
            valueFormatter: (date: string) => date,
          },
        ]}
        series={[{ data: closes, baseline: "min" }]}
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
        <Button color={stockHistoricalData?.length === 7 ? "info" : "primary"}>
          Week
        </Button>
        <Button onClick={updateChart}>Month</Button>
        <Button>Year</Button>
      </ButtonGroup>{" "}
      {chartData}
    </Box>
  );
}
