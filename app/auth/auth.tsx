import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

// Type du contexte d'authentification : le token, l'état de connexion,
// et les méthodes pour se connecter / se déconnecter.
type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Création du contexte React qui sera partagé dans l'application.
const AuthContext = createContext<AuthContextType | null>(null);

const COOKIE_NAME = "authToken";

// Récupère la valeur d'un cookie par son nom.
const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie;
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

// Écrit un cookie sécurisé avec expiration.
const setCookieValue = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

// Supprime un cookie en le réinitialisant avec une date d'expiration passée.
const deleteCookieValue = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
};

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

// Hook personnalisé pour accéder facilement au contexte auth.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
