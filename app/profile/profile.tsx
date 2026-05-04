import { useUser } from "../user/user";
import "./profile.css";

const formatMemberDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const formatDistance = (distance: string) =>
  new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
  }).format(Number(distance));

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}min`;
};

export function ProfileInfo() {
  const { profile, statistics } = useUser();
  const memberDate = formatMemberDate(profile.createdAt);
  const statCards = [
    {
      label: "Temps total couru",
      value: formatDuration(statistics.totalDuration),
    },
    {
      label: "Calories brûlées",
      value: "25000 cal",
    },
    {
      label: "Distance totale parcourue",
      value: `${formatDistance(statistics.totalDistance)} km`,
    },
    {
      label: "Nombre de jours de repos",
      value: "9 jours",
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
