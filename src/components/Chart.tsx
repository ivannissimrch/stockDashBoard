import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { stockContext } from "../App";

export default function Chart() {
  const { stockHistoricalData } = useContext(stockContext);

  function renderChart() {
    if (!stockHistoricalData) {
      return (
        <LineChart
          xAxis={[{ data: [] }]}
          series={[
            {
              data: [],
            },
          ]}
          sx={{ maxWidth: 1053, maxHeight: 393, color: "blue" }}
        />
      );
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
            scaleType: "point",
            dataKey: "date",
            valueFormatter: (date: string) => date,
          },
        ]}
        series={[
          {
            data: closingPrices,
            baseline: "min",
          },
        ]}
        sx={{ maxWidth: 1053, maxHeight: 393, color: "blue" }}
        grid={{ vertical: true, horizontal: true }}
      />
    );
  }

  return <>{renderChart()}</>;
}
