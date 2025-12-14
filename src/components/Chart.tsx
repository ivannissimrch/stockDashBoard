import { LineChart } from "@mui/x-charts/LineChart";
import "./Chart.css";
import { useHistoricalDataContext } from "../contexts/HistoricalDataContext";
import { Skeleton } from "@mui/material";

export default function Chart() {
  const { stockHistoricalData, isHistoricalLoading } =
    useHistoricalDataContext();

  if (isHistoricalLoading) {
    return (
      <Skeleton width="98%" height="100%" className="line_chart_container" />
    );
  }

  if (!stockHistoricalData) {
    return null;
  }

  if (Number.isNaN(stockHistoricalData[0].closingPrices)) {
    return (
      <LineChart
        xAxis={[{ data: [] }]}
        series={[{ data: [] }]}
        className="line_chart_container"
      />
    );
  }

  // Valid data - show chart
  const closingPrices = stockHistoricalData.map((data) => data.closingPrices);
  const chartDataset = stockHistoricalData.map((data) => ({ date: data.date }));

  return (
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
