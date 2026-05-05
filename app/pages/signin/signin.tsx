import "./signin.css";
import runnersImg from "./assets/runners.jpg";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { loginUser } from "../../features/auth/api";
import { ApiError } from "../../services/api";
import { Logo } from "~/components/logo/logo";

export function Connexion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.error("Erreur de connexion:", error);
      setErrorMessage(
        error instanceof ApiError && error.status === 401
          ? "Identifiants incorrects."
          : "Connexion impossible pour le moment. Réessayez dans un instant.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <main className="auth-page">
        <section className="auth-left" aria-labelledby="auth-title">
          <header className="auth-brand">
            <Logo />
          </header>
          <article className="auth-card">
            <h1 id="auth-title">Transformez vos stats en résultats</h1>
            <h2>Se connecter</h2>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  disabled={isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMessage && (
                <p className="auth-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" disabled={!isFormValid || isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <a href="/forgot-password" className="forgot-link">
              Mot de passe oublié ?
            </a>
          </article>
        </section>

        <aside className="auth-right" aria-label="Illustration sportive">
          <img src={runnersImg} alt="" />
          <p className="hero-caption">
            Analysez vos performances en un clin d’œil, suivez vos progrès et
            atteignez vos objectifs.
          </p>
        </aside>
      </main>
    </div>
  );
}
