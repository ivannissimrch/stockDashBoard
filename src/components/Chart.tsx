import { LineChart } from "@mui/x-charts/LineChart";
import "./Chart.css";
import { useHistoricalDataContext } from "../contexts/HistoricalDataContext";
import { Skeleton } from "@mui/material";

export default function Chart() {
  const { stockHistoricalData, isHistoricalLoading } =
    useHistoricalDataContext();

  function renderChart() {
    if (!stockHistoricalData) return;
    if (Number.isNaN(stockHistoricalData[0].closingPrices)) {
      return (
        <LineChart
          xAxis={[{ data: [] }]}
          series={[
            {
              data: [],
            },
          ]}
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

    return isHistoricalLoading ? (
      <Skeleton width="98%" height="100%" className="line_chart_container" />
    ) : (
      <LineChart
        dataset={chartDataset}
        xAxis={[
          {
            scaleType: "point",
            dataKey: "date",
            valueFormatter: (date: string) => date,
            reverse: true,
          },
        ]}
        series={[
          {
            data: closingPrices,
            baseline: "min",
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        className="line_chart_container"
      />
    );
  }

  return <>{renderChart()}</>;
}
