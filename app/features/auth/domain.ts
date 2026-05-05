import { useCallback } from "react";

// Récupère la valeur d'un cookie par son nom.
export const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie;
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

// Écrit un cookie sécurisé avec expiration.
export const setCookieValue = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

// Supprime un cookie en le réinitialisant avec une date d'expiration passée.
export const deleteCookieValue = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
};
