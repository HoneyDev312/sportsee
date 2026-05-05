import { useUserInfo } from "../../hooks/userInfo";
import {
  formatDistance,
  formatMemberDate,
  formatShortDate,
} from "../../helpers/formatters";
import handflagIcon from "./assets/handflag.svg";
import "./dashboard.css";
import { MyPieChart } from "../../components/charts/pie";
import { MyBarChart } from "~/components/charts/barChart";
import { MyComposedChart } from "~/components/charts/composedChart";
import {
  formatActivityDistanceByWeek,
  getLastFourWeeksRange,
  getLastWeekRange,
} from "~/features/userActivity/domain";
import { useUserActivity } from "~/hooks/userActivity";

export function Dashboard() {
  const { profile, statistics, isLoading, error } = useUserInfo();

  const { startWeek: startLastWeek, endWeek: endLastWeek } = getLastWeekRange();
  const {
    activity: lastWeekActivity,
    isLoading: isLastWeekLoading,
    error: lastWeekError,
  } = useUserActivity({
    startWeek: startLastWeek,
    endWeek: endLastWeek,
  });

  const { startWeek, endWeek } = getLastFourWeeksRange();
  const {
    activity: fourWeeksActivity,
    isLoading: isFourWeeksLoading,
    error: fourWeeksError,
  } = useUserActivity({
    startWeek: startWeek,
    endWeek: endWeek,
  });

  if (isLoading || isLastWeekLoading || isFourWeeksLoading) {
    return <main className="dashboard-page">Chargement du dashboard...</main>;
  }

  if (error || lastWeekError || fourWeeksError) {
    return (
      <main className="dashboard-page">
        {error ?? lastWeekError ?? fourWeeksError}
      </main>
    );
  }

  if (!profile || !statistics) {
    return <main className="dashboard-page">Dashboard indisponible.</main>;
  }

  const totalRecentDistance = fourWeeksActivity.reduce(
    (total: number, session: { distance: number }) => total + session.distance,
    0,
  );

  const averageRecentDistance =
    fourWeeksActivity.length > 0
      ? totalRecentDistance / fourWeeksActivity.length
      : 0;

  const averageHeartRate =
    lastWeekActivity.length > 0
      ? Math.round(
          lastWeekActivity.reduce(
            (total: number, session: { heartRate: { average: number } }) =>
              total + session.heartRate.average,
            0,
          ) / lastWeekActivity.length,
        )
      : 0;

  const weeklyDuration = lastWeekActivity.reduce(
    (total: number, session: { duration: number }) => total + session.duration,
    0,
  );

  const weeklyDistance = lastWeekActivity.reduce(
    (total: number, session: { distance: number }) => total + session.distance,
    0,
  );

  const weeklyLabel = `${formatShortDate(startLastWeek)} - ${formatShortDate(
    endLastWeek,
  )}`;
  const fourWeeksLabel = `${formatShortDate(startWeek)} - ${formatShortDate(
    endWeek,
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
              <span>{fourWeeksLabel}</span>
            </header>

            <div className="dashboard-card-summary">
              <MyBarChart activity={fourWeeksActivity} startWeek={startWeek} />
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
              <span>{weeklyLabel}</span>
            </header>

            <div className="dashboard-card-summary">
              <MyComposedChart activity={lastWeekActivity} />
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="week-title">
        <div className="dashboard-section-heading">
          <h2 id="week-title">Cette semaine</h2>
          <p>Du {weeklyLabel}</p>
        </div>

        <div className="dashboard-week-grid">
          <article className="dashboard-week-card">
            <strong>
              x{lastWeekActivity.length}{" "}
              <span className="dashboard-week-unit">sur objectif de 7</span>
            </strong>
            <p className="dashboard-week-subtitle">
              Courses hebdomadaire réalisées
            </p>
            <MyPieChart
              completed={lastWeekActivity.length}
              remaining={7 - lastWeekActivity.length}
            />
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
