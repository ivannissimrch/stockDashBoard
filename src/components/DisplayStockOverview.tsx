import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { stockContext } from "../App";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  minHeight: "25px",
}));

export default function DisplayStockOverview() {
  const { stockOverview } = useContext(stockContext);
  return (
    <Grid container border="1px solid #cccc">
      <Grid item xs={12}>
        <Item>{stockOverview ? stockOverview.symbol : ""}</Item>
      </Grid>

      <Grid item xs={6}>
        <Item>{stockOverview ? `$${stockOverview.price} USD` : ""}</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          {stockOverview ? stockOverview.change : ""}
          {stockOverview ? `(${stockOverview.changePercent}%)` : ""}
        </Item>
      </Grid>
    </Grid>
  );
}
