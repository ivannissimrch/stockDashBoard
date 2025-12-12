import { useThemeContext } from "../ThemeContext";
import "./NoData.css";

export default function NoData() {
  const { containersColors } = useThemeContext();
  return (
    <section className={`noData_container ${containersColors}`}>
      <h1>No Data Available </h1>
    </section>
  );
}
