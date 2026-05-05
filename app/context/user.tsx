import { createContext, useContext, useMemo } from "react";
import { userInfo } from "../test/user-info-mock";
import { userActivity } from "../test/user-activity-mock";
import type { UserProfile, UserStatistics } from "../features/userInfo/types";
import type { UserActivity } from "../features/userActivity/types";
// Type du contexte utilisateur : profil, statistiques et activités.
type UserContextType = {
  profile: UserProfile;
  statistics: UserStatistics;
  activity: UserActivity[];
};

// Création du contexte React pour les données utilisateur.
const UserContext = createContext<UserContextType | null>(null);

// Fournisseur global des données utilisateur.
export function UserProvider({ children }: { children: React.ReactNode }) {
  // Mémoïsation des données pour éviter les rerenders inutiles.
  const value = useMemo(
    () => ({
      profile: userInfo.profile,
      statistics: userInfo.statistics,
      activity: userActivity,
    }),
    [],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Hook personnalisé pour accéder aux données utilisateur.
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
