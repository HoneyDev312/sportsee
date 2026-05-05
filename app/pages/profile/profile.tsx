import { useUserInfo } from "~/hooks/userInfo";
import { userActivity } from "../../test/user-activity-mock";
import {
  formatDistance,
  formatMemberDate,
  formatNumber,
  getDurationParts,
} from "../../helpers/formatters";
import { calculateRestDays } from "../../helpers/statistics";
import "./profile.css";

export function ProfileInfo() {
  const { profile, statistics, isLoading, error } = useUserInfo();
  const activity = userActivity;

  if (isLoading) {
    return <main className="profile-page">Chargement du profil...</main>;
  }

  if (error) {
    return <main className="profile-page">{error}</main>;
  }

  if (!profile || !statistics) {
    return <main className="profile-page">Profil indisponible.</main>;
  }

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
  const totalDuration = getDurationParts(statistics.totalDuration);
  const statCards = [
    {
      label: "Temps total couru",
      mainValue: `${totalDuration.hours}h`,
      secondaryValue: `${totalDuration.minutes}min`,
    },
    {
      label: "Calories brûlées",
      mainValue: formatNumber(totalCaloriesBurned),
      secondaryValue: "cal",
    },
    {
      label: "Distance totale parcourue",
      mainValue: formatDistance(statistics.totalDistance),
      secondaryValue: "km",
    },
    {
      label: "Nombre de jours de repos",
      mainValue: String(restDays),
      secondaryValue: "jours",
    },
    {
      label: "Nombre de sessions",
      mainValue: String(statistics.totalSessions),
      secondaryValue: "sessions",
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
              <strong>
                {stat.mainValue}
                <span>{stat.secondaryValue}</span>
              </strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
