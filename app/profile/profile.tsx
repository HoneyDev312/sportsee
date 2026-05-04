import { useUser } from "../user/user";
import {
  formatDistance,
  formatDuration,
  formatMemberDate,
  formatNumber,
} from "../helpers/formatters";
import { calculateRestDays } from "../helpers/statistics";
import "./profile.css";

export function ProfileInfo() {
  const { profile, statistics, activity } = useUser();
  const memberDate = formatMemberDate(profile.createdAt);
  const totalCaloriesBurned = activity.reduce(
    (total: number, session: { caloriesBurned: number }) =>
      total + session.caloriesBurned,
    0,
  );
  const restDays = calculateRestDays(
    profile.createdAt,
    statistics.totalSessions,
  );
  const statCards = [
    {
      label: "Temps total couru",
      value: formatDuration(statistics.totalDuration),
    },
    {
      label: "Calories brûlées",
      value: `${formatNumber(totalCaloriesBurned)} cal`,
    },
    {
      label: "Distance totale parcourue",
      value: `${formatDistance(statistics.totalDistance)} km`,
    },
    {
      label: "Nombre de jours de repos",
      value: `${restDays} jours`,
    },
    {
      label: "Nombre de sessions",
      value: `${statistics.totalSessions} sessions`,
    },
  ];

  return (
    <main className="profile-page">
      <section className="profile-left-column">
        <article className="profile-card profile-summary">
          <img
            src={profile.profilePicture}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="profile-picture"
          />

          <div>
            <h1>
              {profile.firstName} {profile.lastName}
            </h1>
            <p>Membre depuis le {memberDate}</p>
          </div>
        </article>

        <article className="profile-card profile-details">
          <h2>Votre profil</h2>

          <dl>
            <div>
              <dt>Âge</dt>
              <dd>{profile.age} ans</dd>
            </div>
            <div>
              <dt>Genre</dt>
              <dd>Non renseigné</dd>
            </div>
            <div>
              <dt>Taille</dt>
              <dd>{profile.height} cm</dd>
            </div>
            <div>
              <dt>Poids</dt>
              <dd>{profile.weight} kg</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="profile-statistics" aria-labelledby="stats-title">
        <div className="profile-statistics-heading">
          <h2 id="stats-title">Vos statistiques</h2>
          <p>depuis le {memberDate}</p>
        </div>

        <div className="profile-stat-grid">
          {statCards.map((stat) => (
            <article className="profile-stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
