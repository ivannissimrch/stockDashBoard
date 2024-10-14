import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Chart() {
  return (
    <Box border="1px solid #cccc" height="470px">
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, -5.5, 2, -7.5, 1.5, 6],
            area: true,
            baseline: "min",
          },
        ]}
        max-width={650}
        max-height={330}
      />
    </Box>
  );
}
