import { apiRequest } from "../../services/api";
import { getCookieValue } from "../auth/domain";
import type { UserActivity } from "./types";

const COOKIE_NAME = "authToken";

type GetUserActivityParams = {
  startWeek: string;
  endWeek: string;
};

export async function getUserActivity({
  startWeek,
  endWeek,
}: GetUserActivityParams): Promise<UserActivity[]> {
  const token = getCookieValue(COOKIE_NAME);
  const searchParams = new URLSearchParams({
    startWeek,
    endWeek,
  });

  return apiRequest<UserActivity[]>(`/user-activity?${searchParams}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
