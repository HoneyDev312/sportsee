import { MyPieChart } from "../../components/charts/pie";
import { formatDistance } from "../../helpers/formatters";

type DashboardWeeklySectionProps = {
  completedSessions: number;
  remainingWeeklySessions: number;
  weeklySessionGoal: number;
  lastCompletedWeekDuration: number;
  lastCompletedWeekDistance: number;
  lastCompletedWeekLabel: string;
};

export function DashboardWeeklySection({
  completedSessions,
  remainingWeeklySessions,
  weeklySessionGoal,
  lastCompletedWeekDuration,
  lastCompletedWeekDistance,
  lastCompletedWeekLabel,
}: DashboardWeeklySectionProps) {
  return (
    <section className="dashboard-section" aria-labelledby="week-title">
      <div className="dashboard-section-heading">
        <h2 id="week-title">Dernière semaine complète</h2>
        <p>Du {lastCompletedWeekLabel}</p>
      </div>

      <div className="dashboard-week-grid">
        <article className="dashboard-week-card">
          <strong>
            x{completedSessions}{" "}
            <span className="dashboard-week-unit">
              sur objectif de {weeklySessionGoal}
            </span>
          </strong>
          <p className="dashboard-week-subtitle">
            Courses hebdomadaire réalisées
          </p>
          <MyPieChart
            completed={completedSessions}
            remaining={remainingWeeklySessions}
          />
        </article>

        <div className="dashboard-week-stats">
          <article className="dashboard-week-stat">
            <p className="dashboard-week-subtitle">Durée d'activité</p>
            <span className="dashboard-week-distance">
              <strong>{lastCompletedWeekDuration}</strong>
              <p className="dashboard-week-unit">minutes</p>
            </span>
          </article>

          <article className="dashboard-week-stat">
            <p className="dashboard-week-subtitle">Distance</p>
            <span className="dashboard-week-distance">
              <strong className="dashboard-week-result">
                {formatDistance(lastCompletedWeekDistance)}
              </strong>
              <p className="dashboard-week-unit kilometers">kilomètres</p>
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
