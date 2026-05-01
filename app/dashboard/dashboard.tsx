import { useUser } from "../user/user";

export function Dashboard() {
  const { profile, statistics } = useUser();

  return (
    <div>
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
