import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { stockContext } from "../App";
import { useContext } from "react";

export default function StockDetails() {
  const { stockDetails } = useContext(stockContext);

  return (
    <Box border="1px solid #cccc">
      <List>
        <ListItem>
          <ListItemText primary="Name" />
          <ListItemText
            primary={stockDetails ? stockDetails.name : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Country" />
          <ListItemText
            primary={stockDetails ? stockDetails.country : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Currency" />
          <ListItemText
            primary={stockDetails ? stockDetails.currency : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Exchange" />
          <ListItemText
            primary={stockDetails ? stockDetails.exchange : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="IPO Date" />
          <ListItemText
            primary={stockDetails ? stockDetails.ipo : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Market Capitalization" />
          <ListItemText
            primary={stockDetails ? stockDetails.marketCapitalization : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Industry" />
          <ListItemText
            primary={stockDetails ? stockDetails.finnhubIndustry : ""}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
      </List>
    </Box>
  );
}
