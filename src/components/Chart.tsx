import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { stockContext } from "../App";

export default function Chart() {
  const { stockHistoricalData } = useContext(stockContext);
  let chartData = (
    <LineChart
      xAxis={[{ data: [] }]}
      series={[
        {
          data: [],
        },
      ]}
      sx={{ maxWidth: 650, maxHeight: 330 }}
    />
  );

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
        sx={{ maxWidth: 650, maxHeight: 330 }}
      />
    );
  }

  return (
    <Box border="1px solid #cccc" height="470px" max-width={650}>
      {chartData}
    </Box>
  );
}
