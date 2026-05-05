import {
  formatDistance,
  formatNumber,
  getDurationParts,
} from "../../helpers/formatters";
import { calculateRestDays } from "../../helpers/statistics";
import type { UserProfile, UserStatistics } from "./types";

export type ProfileStatCard = {
  label: string;
  mainValue: string;
  secondaryValue: string;
};

type GetProfileStatCardsParams = {
  profile: UserProfile;
  statistics: UserStatistics;
  totalCaloriesBurned: number;
};

export function getProfileStatCards({
  profile,
  statistics,
  totalCaloriesBurned,
}: GetProfileStatCardsParams): ProfileStatCard[] {
  const restDays = calculateRestDays(
    profile.createdAt,
    statistics.totalSessions,
  );
  const totalDuration = getDurationParts(statistics.totalDuration);

  return [
    {
      label: "Temps total couru",
      mainValue: `${totalDuration.hours}h`,
      secondaryValue: `${totalDuration.minutes}min`,
    },
    {
      label: "Calories brûlées",
      mainValue: formatNumber(totalCaloriesBurned),
      secondaryValue: "cal",
    },
    {
      label: "Distance totale parcourue",
      mainValue: formatDistance(statistics.totalDistance),
      secondaryValue: "km",
    },
    {
      label: "Nombre de jours de repos",
      mainValue: String(restDays),
      secondaryValue: "jours",
    },
    {
      label: "Nombre de sessions",
      mainValue: String(statistics.totalSessions),
      secondaryValue: "sessions",
    },
  ];
}
