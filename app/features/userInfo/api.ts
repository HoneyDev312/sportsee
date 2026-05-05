import { apiRequest } from "../../services/api";
import { getCookieValue } from "../auth/domain";
import type { UserInfo } from "./types";

const COOKIE_NAME = "authToken";

export async function getUserInfo(): Promise<UserInfo> {
  const token = getCookieValue(COOKIE_NAME);

  return apiRequest<UserInfo>("/user-info", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
