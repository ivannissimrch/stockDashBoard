import { useContext } from "react";
import "./ContactUsPage.css";
import { stockContext } from "../App";
export default function ContactUsPage() {
  const { containersColors } = useContext(stockContext);

  return (
    <section className={`contact_us_container  ${containersColors}`}>
      <h1>Contact us : xxx xxxx xxxx</h1>
    </section>
  );
}
