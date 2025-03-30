import "./NavBar.css";
import { useContext } from "react";
import { stockContext } from "../../App";

export default function NavBar() {
  const { primaryColors, accentColors } = useContext(stockContext);
  return (
    <nav className={`navbar_container ${primaryColors}`}>
      <h1 className={`navbar_logo colors ${accentColors}`}> Stock Dashboard</h1>
    </nav>
  );
}
