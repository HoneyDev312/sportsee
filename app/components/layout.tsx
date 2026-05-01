import { Link, NavLink, Outlet, redirect } from "react-router";
import type { Route } from "../+types/root";
import { useAuth } from "../auth/auth";
import { Logo } from "./logo/logo";
import "./layout.css";
import iconLogoDefault from "./logo/assets/iconLogoDefault.svg";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("Cookie") ?? "";
  const isLoggedIn = cookie.includes("authToken=");

  if (!isLoggedIn) {
    throw redirect("/");
  }

  return null;
}

export default function Layout() {
  const { logout } = useAuth();
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? " active" : ""}`;

  return (
    <div className="container layout">
      <header className="header">
        <div className="header-inner">
          <Logo />

          <nav className="nav" aria-label="Navigation principale">
            <NavLink to="/dashboard" className={navLinkClassName}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={navLinkClassName}>
              Mon profil
            </NavLink>
            <div className="nav-divider" aria-hidden="true" />
            <button type="button" className="logout" onClick={logout}>
              Se déconnecter
            </button>
          </nav>
        </div>
      </header>

      <div className="content">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copyright">©Sportsee - Tous droits réservés</p>

          <nav className="footer-nav" aria-label="Liens secondaires">
            <Link to="/conditions-generales" className="footer-link">
              Conditions générales
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
            <span className="footer-logo" aria-label="logo" role="img">
              <img
                src={iconLogoDefault}
                alt="logo"
                className="footer-logo-image"
              />
            </span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
