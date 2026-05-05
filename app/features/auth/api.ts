import { apiRequest } from "../../services/api";
import type { LoginResponse } from "./types";

type LoginCredentials = {
  username: string;
  password: string;
};

export async function loginUser({
  username,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/login", {
    method: "POST",
    body: { username, password },
  });
}
