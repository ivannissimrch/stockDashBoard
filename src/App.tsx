import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Chart from "./components/Chart";
import SearchBar from "./components/SearchBar";
import { Typography } from "@mui/material";
import StockDetails from "./components/StockDetails";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }} height={840}>
      <Typography variant="h2" gutterBottom>
        Stock dashboard
      </Typography>
      <SearchBar />
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, md: 4 }}
        height={790}
        margin={2}
      >
        <Grid xs={4} md={3} height={790}>
          <Chart />
        </Grid>
        <Grid xs={4} md={1}>
          <Item>Value</Item>
          <StockDetails />
        </Grid>
      </Grid>
    </Box>
  );
}
