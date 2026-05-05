import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserActivity } from "../features/userActivity/api";
import { getLastFourCompletedCalendarWeeksRange } from "../features/userActivity/domain";
import type { UserActivity } from "../features/userActivity/types";
import { ApiError } from "../services/api";

type UseUserActivityOptions = {
  startWeek?: string;
  endWeek?: string;
};

export function useUserActivity(options: UseUserActivityOptions = {}) {
  const defaultRange = useMemo(() => getLastFourCompletedCalendarWeeksRange(), []);
  const startWeek = options.startWeek ?? defaultRange.startWeek;
  const endWeek = options.endWeek ?? defaultRange.endWeek;
  const [activity, setActivity] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserActivity({ startWeek, endWeek });
      setActivity(data);
      return data;
    } catch (error) {
      setActivity([]);
      setError(
        error instanceof ApiError && error.status === 401
          ? "Votre session a expiré. Veuillez vous reconnecter."
          : "Impossible de charger l'activité utilisateur.",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [endWeek, startWeek]);

  useEffect(() => {
    fetchUserActivity();
  }, [fetchUserActivity]);

  return {
    activity,
    isLoading,
    error,
    startWeek,
    endWeek,
    refetch: fetchUserActivity,
  };
}
