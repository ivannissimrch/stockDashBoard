import { GroupType } from "./organizedStocksInGroups";
import { weekNumber } from "weeknumber";

export default function categorizeByTimePeriod(groupBy: GroupType, date: Date) {
  if (groupBy === GroupType.Month) {
    return date.toLocaleString("default", {
      month: "short",
    });
  }
  if (groupBy === GroupType.Week) {
    const calendarWeekNumber: number = weekNumber(date);
    return `Week ${calendarWeekNumber}`;
  } else {
    return "";
  }
}
