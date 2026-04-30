import "./signin.css";
import runnersImg from "./assets/runners.jpg";
import logo from "./assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
};

export function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setCookie("authToken", data.token, 7);
        navigate("/dashboard");
      } else {
        alert("Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="container">
      <main className="auth-page">
        <section className="auth-left" aria-labelledby="auth-title">
          <header className="auth-brand">
            <a href="/" className="brand-link" aria-label="Retour à l'accueil">
              <img src={logo} alt="SportSee" />
            </a>
          </header>

          <article className="auth-card">
            <h1 id="auth-title">Transformez vos stats en résultats</h1>
            <h2>Se connecter</h2>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">Adresse email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <button type="submit">Se connecter</button>
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
