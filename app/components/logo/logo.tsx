import iconLogoDefault from "./assets/iconLogoDefault.svg";
import iconLogoStep2 from "./assets/iconLogoStep2.svg";
import logoText from "./assets/logoText.svg";
import "./logo.css";

export function Logo() {
  return (
    <a href="/" className="brand-link" aria-label="Retour à l'accueil">
      <div className="logo-container">
        <span className="logo-icon" aria-hidden="true">
          <img
            src={iconLogoDefault}
            alt=""
            className="logo-icon-image logo-icon-default"
          />
          <img
            src={iconLogoStep2}
            alt=""
            className="logo-icon-image logo-icon-step"
          />
        </span>
        <img src={logoText} alt="SportSee" className="logo-text" />
      </div>
    </a>
  );
}
