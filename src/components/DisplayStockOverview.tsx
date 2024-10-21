import { styled, Paper, Grid } from "@mui/material";
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
  const {
    symbol = "",
    price = "",
    change = "",
    changePercent = "",
  } = stockOverview || {};
  return (
    <Grid container border="1px solid #cccc">
      <Grid item xs={12}>
        <Item>{symbol}</Item>
      </Grid>

      <Grid item xs={6}>
        <Item>{`$${price} USD`}</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          {change}
          {`(${changePercent}%)`}
        </Item>
      </Grid>
    </Grid>
  );
}
