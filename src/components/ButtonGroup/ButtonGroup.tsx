import { ReactNode } from "react";
import "./ButtonGroup.css";

export default function ButtonGroupContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="button_group">{children}</div>;
}
