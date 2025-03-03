import { Outlet, useLocation } from "react-router";
import NavBar from "../components/NavBar/NarBar";
import { useContext } from "react";
import { stockContext } from "../App";
import "./Root.css";
import SearchBar from "../components/SearchBar/SearchBar";
import DashboardTitle from "../components/DashBoardTitle/DashboardTitle";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { secondaryColors, implementDarkMode } = useContext(stockContext);
  return (
    <>
      <main className={`app_main_container ${secondaryColors}`}>
        <NavBar />
        <section className="secondary_container">
          <SearchBar />
          <DashboardTitle onClick={implementDarkMode}>
            {pathname === "/dashboard" ? "Dashboard" : ""}
            {pathname === "/" ? "Recently seen stocks" : ""}
          </DashboardTitle>
          <Outlet />
        </section>
      </main>
    </>
  );
}
