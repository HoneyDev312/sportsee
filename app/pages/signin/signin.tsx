import "./signin.css";
import runnersImg from "./assets/runners.jpg";
import { Logo } from "~/components/logo/logo";
import { useSignin } from "~/hooks/signin";

export function Connexion() {
  const {
    username,
    password,
    isLoading,
    errorMessage,
    usernameError,
    passwordError,
    isFormValid,
    setUsername,
    setPassword,
    submitSignin,
  } = useSignin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitSignin();
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
                  aria-invalid={Boolean(usernameError)}
                  aria-describedby={
                    usernameError ? "username-error" : undefined
                  }
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && (
                  <p className="field-error" id="username-error">
                    {usernameError}
                  </p>
                )}
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
                  aria-invalid={Boolean(passwordError)}
                  aria-describedby={
                    passwordError ? "password-error" : undefined
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="field-error" id="password-error">
                    {passwordError}
                  </p>
                )}
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
