import { useThemeContext } from "../../ThemeContext";
import "./SecondaryDashboardPageContainer.css";
import { ReactNode } from "react";

export default function SecondaryDashboardPageContainer({
  children,
}: {
  children: ReactNode;
}) {
  const { containersColors } = useThemeContext();
  return (
    <section className={`SecondaryDashboardPageContainer ${containersColors}`}>
      {children}
    </section>
  );
}
