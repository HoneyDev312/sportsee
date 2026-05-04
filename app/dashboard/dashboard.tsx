import { useUser } from "../user/user";
import { formatDistance, formatMemberDate } from "../helpers/formatters";
import handflagIcon from "./assets/handflag.svg";
import "./dashboard.css";

export function Dashboard() {
  const { profile, statistics } = useUser();

  return (
    <main className="dashboard-page">
      <section className="dashboard-profile-card" aria-label="Résumé du profil">
        <div className="dashboard-profile">
          <img
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="dashboard-profile-picture"
          />

          <div className="dashboard-profile-text">
            <h1>
              {profile.firstName} {profile.lastName}
            </h1>
            <p>Membre depuis le {formatMemberDate(profile.createdAt)}</p>
          </div>
        </div>

        <div className="dashboard-distance">
          <p>Distance totale parcourue</p>
          <strong className="dashboard-distance-value">
            <img src={handflagIcon} alt="" aria-hidden="true" />
            <span>{formatDistance(statistics.totalDistance)} km</span>
          </strong>
        </div>
      </section>
    </main>
  );
}
