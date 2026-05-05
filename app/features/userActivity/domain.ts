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

const formatDateForApi = (date: Date) => date.toISOString().slice(0, 10);

const getMonday = (date: Date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;

  monday.setDate(monday.getDate() - daysSinceMonday);

  return monday;
};

const parseDateOnly = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function getLastWeekRange(referenceDate = new Date()): WeekRange {
  const currentMonday = getMonday(referenceDate);
  const startWeek = new Date(currentMonday);
  const endWeek = new Date(currentMonday);

  startWeek.setDate(startWeek.getDate() - DAYS_IN_WEEK);
  endWeek.setDate(endWeek.getDate() + DAYS_IN_WEEK - 1);

  return {
    startWeek: formatDateForApi(startWeek),
    endWeek: formatDateForApi(endWeek),
  };
}

export function getLastFourWeeksRange(referenceDate = new Date()): WeekRange {
  const currentMonday = getMonday(referenceDate);
  const startWeek = new Date(currentMonday);
  const endWeek = new Date(currentMonday);

  startWeek.setDate(startWeek.getDate() - DAYS_IN_WEEK * (LAST_FOUR_WEEKS - 1));
  endWeek.setDate(endWeek.getDate() + DAYS_IN_WEEK - 1);

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
