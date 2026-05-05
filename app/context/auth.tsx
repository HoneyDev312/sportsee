import { createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  getCookieValue,
  setCookieValue,
  deleteCookieValue,
} from "../features/auth/domain";

// Type du contexte d'authentification : le token, l'état de connexion,
// et les méthodes pour se connecter / se déconnecter.
type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Création du contexte React qui sera partagé dans l'application.
export const AuthContext = createContext<AuthContextType | null>(null);

const COOKIE_NAME = "authToken";

// Stocke le token, expose login/logout et garde le composant enfant accessible.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialisation du token depuis le cookie si présent.
  const [token, setToken] = useState<string | null>(() =>
    getCookieValue(COOKIE_NAME),
  );
  const navigate = useNavigate();

  // Connecte l'utilisateur : on écrit le cookie et on met à jour le state.
  const login = useCallback(
    (newToken: string) => {
      console.log("AuthProvider login", { newTokenPresent: Boolean(newToken) });
      setCookieValue(COOKIE_NAME, newToken, 7);
      setToken(newToken);
      navigate("/dashboard");
    },
    [navigate],
  );

  // Déconnecte l'utilisateur : on supprime le cookie et on vide l'état.
  const logout = useCallback(() => {
    deleteCookieValue(COOKIE_NAME);
    setToken(null);
    navigate("/");
  }, [navigate]);

  // Mémoïsation du contexte pour éviter des rerenders inutiles.
  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
