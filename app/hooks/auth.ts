import { useContext } from "react";
import { AuthContext } from "../context/auth";

// Hook personnalisé pour accéder facilement au contexte auth.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
