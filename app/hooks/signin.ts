import { useState } from "react";
import { loginUser } from "../features/auth/api";
import { ApiError } from "../services/api";
import { useAuth } from "./auth";

export function useSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const trimmedUsername = username.trim();
  const usernameError =
    trimmedUsername.length === 0
      ? "Le nom d'utilisateur est obligatoire."
      : trimmedUsername.length < 2
        ? "Le nom d'utilisateur doit contenir au moins 2 caractères."
        : null;
  const passwordError =
    password.length === 0
      ? "Le mot de passe est obligatoire."
      : password.length < 6
        ? "Le mot de passe doit contenir au moins 6 caractères."
        : null;
  const isFormValid = !usernameError && !passwordError;

  const submitSignin = async () => {
    setHasSubmitted(true);

    if (!isFormValid || isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await loginUser({ username, password });

      if (!data.token) {
        throw new Error("Token de connexion manquant.");
      }

      login(data.token);
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError && error.status === 401
          ? "Identifiants incorrects."
          : "Connexion impossible pour le moment. Réessayez dans un instant.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    isLoading,
    errorMessage,
    usernameError: hasSubmitted ? usernameError : null,
    passwordError: hasSubmitted ? passwordError : null,
    isFormValid,
    setUsername,
    setPassword,
    submitSignin,
  };
}
