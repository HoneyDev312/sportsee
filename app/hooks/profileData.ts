import { useMemo } from "react";
import { getLastFourCompletedCalendarWeeksRange } from "../features/userActivity/domain";
import { getTotalCaloriesBurned } from "../features/userActivity/domain";
import { getProfileStatCards } from "../features/userInfo/domain";
import { formatMemberDate } from "../helpers/formatters";
import { useUserActivity } from "./userActivity";
import { useUserInfo } from "./userInfo";

export function useProfileData() {
  const userInfo = useUserInfo();
  const activityRange = useMemo(
    () => getLastFourCompletedCalendarWeeksRange(),
    [],
  );
  const userActivity = useUserActivity(activityRange);
  const totalCaloriesBurned = getTotalCaloriesBurned(userActivity.activity);
  const memberDate = userInfo.profile
    ? formatMemberDate(userInfo.profile.createdAt)
    : "";
  const statCards =
    userInfo.profile && userInfo.statistics
      ? getProfileStatCards({
          profile: userInfo.profile,
          statistics: userInfo.statistics,
          totalCaloriesBurned,
        })
      : [];

  return {
    profile: userInfo.profile,
    statistics: userInfo.statistics,
    activity: userActivity.activity,
    memberDate,
    statCards,
    isLoading: userInfo.isLoading || userActivity.isLoading,
    error: userInfo.error ?? userActivity.error,
  };
}
