import { Link } from "react-router";
import { Logo } from "../../components/logo/logo";
import "./error.css";

type ErrorPageProps = {
  title: string;
  message: string;
  stack?: string;
};

export function ErrorPage({ title, message, stack }: ErrorPageProps) {
  return (
    <main className="error-page">
      <section className="error-panel" aria-labelledby="error-title">
        <Logo />

        <div className="error-content">
          <p className="error-kicker">Une erreur est survenue</p>
          <h1 id="error-title">{title}</h1>
          <p className="error-message">{message}</p>
        </div>

        <div className="error-actions">
          <Link to="/dashboard" className="error-primary-link">
            Retour au dashboard
          </Link>
          <Link to="/" className="error-secondary-link">
            Revenir a l'accueil
          </Link>
        </div>

        {stack && (
          <pre className="error-stack">
            <code>{stack}</code>
          </pre>
        )}
      </section>
    </main>
  );
}
