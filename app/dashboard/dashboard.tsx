import { useUser } from "../user/user";
import {
  formatDistance,
  formatMemberDate,
  formatShortDate,
} from "../helpers/formatters";
import handflagIcon from "./assets/handflag.svg";
import "./dashboard.css";

export function Dashboard() {
  const { profile, statistics, activity } = useUser();
  const latestSessions = activity.slice(-4);
  const totalRecentDistance = latestSessions.reduce(
    (total: number, session: { distance: number }) => total + session.distance,
    0,
  );
  const averageRecentDistance = totalRecentDistance / latestSessions.length;
  const averageHeartRate = Math.round(
    activity.reduce(
      (total: number, session: { heartRate: { average: number } }) =>
        total + session.heartRate.average,
      0,
    ) / activity.length,
  );
  const weeklyDuration = activity.reduce(
    (total: number, session: { duration: number }) => total + session.duration,
    0,
  );
  const weeklyDistance = activity.reduce(
    (total: number, session: { distance: number }) => total + session.distance,
    0,
  );
  const firstSession = activity[0];
  const lastSession = activity[activity.length - 1];
  const periodLabel = `${formatShortDate(firstSession.date)} - ${formatShortDate(
    lastSession.date,
  )}`;

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

      <section
        className="dashboard-section"
        aria-labelledby="latest-performance-title"
      >
        <h2 id="latest-performance-title">Vos dernières performances</h2>

        <div className="dashboard-performance-grid">
          <article className="dashboard-metric-card">
            <header className="dashboard-card-header">
              <div>
                <strong>
                  {formatDistance(averageRecentDistance)}km en moyenne
                </strong>
                <p>Total des kilomètres 4 dernières semaines</p>
              </div>
              <span>{periodLabel}</span>
            </header>

            <div className="dashboard-card-summary">
              <p>{formatDistance(totalRecentDistance)} km</p>
              <span>Total sur les 4 dernières sessions</span>
            </div>
          </article>

          <article className="dashboard-metric-card">
            <header className="dashboard-card-header">
              <div>
                <strong className="dashboard-heart-rate">
                  {averageHeartRate} BPM
                </strong>
                <p>Fréquence cardiaque moyenne</p>
              </div>
              <span>{periodLabel}</span>
            </header>

            <div className="dashboard-card-summary">
              <p>{averageHeartRate} BPM</p>
              <span>Moyenne sur les dernières activités</span>
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="week-title">
        <div className="dashboard-section-heading">
          <h2 id="week-title">Cette semaine</h2>
          <p>Du {periodLabel}</p>
        </div>

        <div className="dashboard-week-grid">
          <article className="dashboard-week-card">
            <strong>
              x{activity.length}{" "}
              <span className="dashboard-week-unit">sur objectif de 6</span>
            </strong>
            <p className="dashboard-week-subtitle">
              Courses hebdomadaire réalisées
            </p>
          </article>

          <div className="dashboard-week-stats">
            <article className="dashboard-week-stat">
              <p className="dashboard-week-subtitle">Durée d'activité</p>
              <span className="dashboard-week-distance">
                <strong>{weeklyDuration}</strong>
                <p className="dashboard-week-unit">minutes</p>
              </span>
            </article>

            <article className="dashboard-week-stat">
              <p className="dashboard-week-subtitle">Distance</p>
              <span className="dashboard-week-distance">
                <strong className="dashboard-week-result">
                  {formatDistance(weeklyDistance)}
                </strong>
                <p className="dashboard-week-unit kilometers">kilomètres</p>
              </span>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
