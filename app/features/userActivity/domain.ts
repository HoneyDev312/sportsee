import type { UserActivity } from "./types";

type WeekRange = {
  startWeek: string;
  endWeek: string;
};

export type WeeklyDistance = {
  name: string;
  Km: number;
};

const DAYS_IN_WEEK = 7;
const LAST_FOUR_WEEKS = 4;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
export const WEEKLY_SESSION_GOAL = 7;

const formatDateForApi = (date: Date) => date.toISOString().slice(0, 10);

const getMonday = (date: Date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;

  monday.setDate(monday.getDate() - daysSinceMonday);

  return monday;
};

const getLastCompletedSunday = (date: Date) => {
  const currentMonday = getMonday(date);
  const sunday = new Date(currentMonday);

  sunday.setDate(sunday.getDate() - 1);

  return sunday;
};

const parseDateOnly = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function getLastCompletedWeekRange(
  referenceDate = new Date(),
): WeekRange {
  const endWeek = getLastCompletedSunday(referenceDate);
  const startWeek = new Date(endWeek);

  startWeek.setDate(startWeek.getDate() - DAYS_IN_WEEK + 1);

  return {
    startWeek: formatDateForApi(startWeek),
    endWeek: formatDateForApi(endWeek),
  };
}

export function getLastFourCompletedCalendarWeeksRange(
  referenceDate = new Date(),
): WeekRange {
  const endWeek = getLastCompletedSunday(referenceDate);
  const startWeek = new Date(endWeek);

  startWeek.setDate(startWeek.getDate() - DAYS_IN_WEEK * LAST_FOUR_WEEKS + 1);

  return {
    startWeek: formatDateForApi(startWeek),
    endWeek: formatDateForApi(endWeek),
  };
}

export function formatActivityDistanceByWeek(
  activity: UserActivity[],
  startWeek: string,
): WeeklyDistance[] {
  const startDate = parseDateOnly(startWeek);
  const weeklyDistance = Array.from(
    { length: LAST_FOUR_WEEKS },
    (_, index) => ({
      name: `S${index + 1}`,
      Km: 0,
    }),
  );

  activity.forEach((session) => {
    const sessionDate = parseDateOnly(session.date);
    const daysSinceStart = Math.floor(
      (sessionDate.getTime() - startDate.getTime()) / DAY_IN_MS,
    );
    const weekIndex = Math.floor(daysSinceStart / DAYS_IN_WEEK);

    if (weekIndex >= 0 && weekIndex < LAST_FOUR_WEEKS) {
      weeklyDistance[weekIndex].Km += session.distance;
    }
  });

  return weeklyDistance;
}

export function getTotalDistance(activity: UserActivity[]) {
  return activity.reduce((total, session) => total + session.distance, 0);
}

export function getAverageDistance(activity: UserActivity[]) {
  return activity.length > 0 ? getTotalDistance(activity) / activity.length : 0;
}

export function getAverageHeartRate(activity: UserActivity[]) {
  if (activity.length === 0) {
    return 0;
  }

  const totalHeartRate = activity.reduce(
    (total, session) => total + session.heartRate.average,
    0,
  );

  return Math.round(totalHeartRate / activity.length);
}

export function getTotalDuration(activity: UserActivity[]) {
  return activity.reduce((total, session) => total + session.duration, 0);
}

export function getTotalCaloriesBurned(activity: UserActivity[]) {
  return activity.reduce((total, session) => total + session.caloriesBurned, 0);
}

export function getRemainingWeeklySessions(activity: UserActivity[]) {
  return Math.max(WEEKLY_SESSION_GOAL - activity.length, 0);
}
