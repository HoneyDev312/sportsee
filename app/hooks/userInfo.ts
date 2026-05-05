import { useCallback, useEffect, useState } from "react";
import { getUserInfo } from "../features/userInfo/api";
import type { UserInfo } from "../features/userInfo/types";
import { ApiError } from "../services/api";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserInfo();
      setUserInfo(data);
      return data;
    } catch (error) {
      setUserInfo(null);
      setError(
        error instanceof ApiError && error.status === 401
          ? "Votre session a expiré. Veuillez vous reconnecter."
          : "Impossible de charger les informations utilisateur.",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return {
    userInfo,
    profile: userInfo?.profile ?? null,
    statistics: userInfo?.statistics ?? null,
    isLoading,
    error,
    refetch: fetchUserInfo,
  };
}
