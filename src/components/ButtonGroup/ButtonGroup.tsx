import "./ButtonGroup.css";
import Button from "../Button/Button";
import { useStocksContext } from "../StocksContextProvider";
import { Skeleton } from "@mui/material";

export default function ButtonGroupContainer() {
  const {
    stockHistoricalData,
    updateToSevenDays,
    updateToSixWeeks,
    updateToFiveMonths,
    isStocksInfoLoading,
  } = useStocksContext();

  return (
    <div className="button_group">
      {!isStocksInfoLoading ? (
        <>
          {" "}
          <Button
            onClick={updateToSevenDays}
            active={`${
              stockHistoricalData?.length === 7 ? "button_active" : ""
            }`}
          >
            7 days
          </Button>
          <Button
            onClick={updateToSixWeeks}
            active={`${
              stockHistoricalData?.length === 6 ? "button_active" : ""
            }`}
          >
            6 Weeks
          </Button>
          <Button
            onClick={updateToFiveMonths}
            active={`${
              stockHistoricalData?.length === 5 ? "button_active" : ""
            }`}
          >
            5 months
          </Button>
        </>
      ) : (
        <Skeleton variant="rounded" width="100%" height="100%" />
      )}
    </div>
  );
}
