import { MyBarChart } from "../../components/charts/barChart";
import { MyComposedChart } from "../../components/charts/composedChart";
import type { UserActivity } from "../../features/userActivity/types";
import { formatDistance } from "../../helpers/formatters";

type DashboardPerformanceSectionProps = {
  lastCompletedWeekActivity: UserActivity[];
  lastFourWeeksActivity: UserActivity[];
  lastFourWeeksStartDate: string;
  averageRecentDistance: number;
  averageHeartRate: number;
  lastCompletedWeekLabel: string;
  lastFourWeeksLabel: string;
};

export function DashboardPerformanceSection({
  lastCompletedWeekActivity,
  lastFourWeeksActivity,
  lastFourWeeksStartDate,
  averageRecentDistance,
  averageHeartRate,
  lastCompletedWeekLabel,
  lastFourWeeksLabel,
}: DashboardPerformanceSectionProps) {
  return (
    <section
      className="dashboard-section"
      aria-labelledby="latest-performance-title"
    >
      <h2 id="latest-performance-title">Vos dernières performances</h2>

      <div className="dashboard-performance-grid">
        <article className="dashboard-metric-card">
          <header className="dashboard-card-header">
            <div>
              <strong>{formatDistance(averageRecentDistance)}km en moyenne</strong>
              <p>Total des kilomètres 4 dernières semaines</p>
            </div>
            <span>{lastFourWeeksLabel}</span>
          </header>

          <div className="dashboard-card-summary">
            <MyBarChart
              activity={lastFourWeeksActivity}
              startWeek={lastFourWeeksStartDate}
            />
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
            <span>{lastCompletedWeekLabel}</span>
          </header>

          <div className="dashboard-card-summary">
            <MyComposedChart activity={lastCompletedWeekActivity} />
          </div>
        </article>
      </div>
    </section>
  );
}
