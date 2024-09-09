import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar } from "@mui/material";
import StockSearchInput from "./StockSearchInput";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function SearchBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <StockSearchInput />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
