import { useAuth } from "../auth/auth";

export function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <button type="button" onClick={logout}>
        Déconnexion
      </button>
      <div>Dashboard</div>
    </div>
  );
}
