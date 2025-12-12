import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useRecentlySeenStocksContext } from "../../contexts/RecentlySeenStocksContext";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import RecentlySeenStockDrawer from "../RecentlySeenStockDrawer/RecentlySeenStockDrawer";
import "./AsideDrawer.css";

export default function AsideDrawer() {
  const anchor = "left";
  const { recentlySeenStocks } = useRecentlySeenStocksContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <section key={anchor} className="drawer_container">
      <Button onClick={toggleDrawer(true)}>
        <RxHamburgerMenu size={24} />
      </Button>
      <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
        <>
          <h1 className="aside_drawer_title">Recently seen</h1>
          {recentlySeenStocks.map((stock) => (
            <RecentlySeenStockDrawer
              key={stock.stockOverview.symbol}
              stock={stock}
            />
          ))}
        </>
      </Drawer>
    </section>
  );
}
