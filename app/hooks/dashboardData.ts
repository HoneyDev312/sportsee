import { useMemo } from "react";
import { formatShortDate } from "../helpers/formatters";
import {
  WEEKLY_SESSION_GOAL,
  getAverageDistance,
  getAverageHeartRate,
  getLastCompletedWeekRange,
  getLastFourCompletedCalendarWeeksRange,
  getRemainingWeeklySessions,
  getTotalDistance,
  getTotalDuration,
} from "../features/userActivity/domain";
import { useUserActivity } from "./userActivity";
import { useUserInfo } from "./userInfo";

export function useDashboardData() {
  const userInfo = useUserInfo();
  const lastCompletedWeekRange = useMemo(() => getLastCompletedWeekRange(), []);
  const lastFourWeeksRange = useMemo(
    () => getLastFourCompletedCalendarWeeksRange(),
    [],
  );
  const lastCompletedWeek = useUserActivity(lastCompletedWeekRange);
  const lastFourWeeks = useUserActivity(lastFourWeeksRange);

  const lastCompletedWeekLabel = `${formatShortDate(
    lastCompletedWeekRange.startWeek,
  )} - ${formatShortDate(lastCompletedWeekRange.endWeek)}`;
  const lastFourWeeksLabel = `${formatShortDate(
    lastFourWeeksRange.startWeek,
  )} - ${formatShortDate(lastFourWeeksRange.endWeek)}`;

  return {
    profile: userInfo.profile,
    statistics: userInfo.statistics,
    lastCompletedWeekActivity: lastCompletedWeek.activity,
    lastFourWeeksActivity: lastFourWeeks.activity,
    lastFourWeeksStartDate: lastFourWeeksRange.startWeek,
    averageRecentDistance: getAverageDistance(lastFourWeeks.activity),
    averageHeartRate: getAverageHeartRate(lastCompletedWeek.activity),
    lastCompletedWeekDuration: getTotalDuration(lastCompletedWeek.activity),
    lastCompletedWeekDistance: getTotalDistance(lastCompletedWeek.activity),
    lastCompletedWeekLabel,
    lastFourWeeksLabel,
    weeklySessionGoal: WEEKLY_SESSION_GOAL,
    remainingWeeklySessions: getRemainingWeeklySessions(
      lastCompletedWeek.activity,
    ),
    isLoading:
      userInfo.isLoading ||
      lastCompletedWeek.isLoading ||
      lastFourWeeks.isLoading,
    error: userInfo.error ?? lastCompletedWeek.error ?? lastFourWeeks.error,
  };
}
