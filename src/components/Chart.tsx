import { LineChart } from "@mui/x-charts/LineChart";

export default function Chart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, -5.5, 2, -7.5, 1.5, 6],
          area: true,
          baseline: "min",
        },
      ]}
      width={500}
      height={300}
    />
  );
}
