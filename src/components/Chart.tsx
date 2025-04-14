import { LineChart } from "@mui/x-charts/LineChart";
import "./Chart.css";
import { useStocksContext } from "./StocksContextProvider";
import { Skeleton } from "@mui/material";

export default function Chart() {
  const { stockHistoricalData, isStocksInfoLoading } = useStocksContext();

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

    return isStocksInfoLoading ? (
      <Skeleton width="98%" height="100%" className="line_chart_container" />
    ) : (
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
        grid={{ vertical: true, horizontal: true }}
        className="line_chart_container"
      />
    );
  }

  return <>{renderChart()}</>;
}
