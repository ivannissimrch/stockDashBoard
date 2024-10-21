import { Box, List, ListItem, ListItemText } from "@mui/material";
import { stockContext } from "../App";
import { useContext } from "react";

export default function DisplayStockDetails() {
  const { stockDetails } = useContext(stockContext);
  const {
    name = "",
    country = "",
    currency = "",
    exchange = "",
    ipo = "",
    marketCapitalization = "",
    finnhubIndustry = "",
  } = stockDetails || {};
  return (
    <Box border="1px solid #cccc">
      <List>
        <ListItem>
          <ListItemText primary="Name" />
          <ListItemText primary={name} sx={{ textAlign: "right" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Country" />
          <ListItemText primary={country} sx={{ textAlign: "right" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Currency" />
          <ListItemText primary={currency} sx={{ textAlign: "right" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Exchange" />
          <ListItemText primary={exchange} sx={{ textAlign: "right" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="IPO Date" />
          <ListItemText primary={ipo} sx={{ textAlign: "right" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Market Capitalization" />
          <ListItemText
            primary={marketCapitalization}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Industry" />
          <ListItemText primary={finnhubIndustry} sx={{ textAlign: "right" }} />
        </ListItem>
      </List>
    </Box>
  );
}
