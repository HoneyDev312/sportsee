import "./signin.css";
import runnersImg from "./assets/runners.jpg";
import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { Logo } from "~/components/logo/logo";

export function Connexion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    console.log("Signin submit", { username, password });

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Signin response status", response.status);

      const data = await response.json().catch(() => null);
      console.log("Signin response data", data);

      if (response.ok && data?.token) {
        login(data.token);
      } else {
        console.error("Login failed", response.status, data);
        alert("Erreur de connexion: vérifie tes identifiants ou l’API");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de connexion");
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={!isFormValid}>
                Se connecter
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
