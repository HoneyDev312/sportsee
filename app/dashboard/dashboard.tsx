import { useAuth } from "../auth/auth";
import { useUser } from "../user/user";

export function Dashboard() {
  const { logout } = useAuth();
  const { profile, statistics } = useUser();

  return (
    <div>
      <button type="button" onClick={logout}>
        Déconnexion
      </button>
      <div>Dashboard</div>
      <div>
        <h2>
          Bienvenue {profile.firstName} {profile.lastName}
        </h2>
        <p>Total distance: {statistics.totalDistance} km</p>
        <p>Total sessions: {statistics.totalSessions}</p>
      </div>
    </div>
  );
}
