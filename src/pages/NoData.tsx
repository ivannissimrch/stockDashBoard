import { useStocksContext } from "../components/StocksContextProvider";
import "./NoData.css";

export default function NoData() {
  const { containersColors } = useStocksContext();
  return (
    <section className={`noData_container ${containersColors}`}>
      <h1>No Data Avalible </h1>
    </section>
  );
}
