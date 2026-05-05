import "./dashboard.css";
import { PageState } from "~/components/pageState";
import { useDashboardData } from "~/hooks/dashboardData";
import { DashboardPerformanceSection } from "./dashboardPerformanceSection";
import { DashboardProfileCard } from "./dashboardProfileCard";
import { DashboardWeeklySection } from "./dashboardWeeklySection";

export function Dashboard() {
  const {
    profile,
    statistics,
    lastCompletedWeekActivity,
    lastFourWeeksActivity,
    lastFourWeeksStartDate,
    averageRecentDistance,
    averageHeartRate,
    lastCompletedWeekDuration,
    lastCompletedWeekDistance,
    lastCompletedWeekLabel,
    lastFourWeeksLabel,
    weeklySessionGoal,
    remainingWeeklySessions,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return (
      <PageState
        className="dashboard-page"
        message="Chargement du dashboard..."
        variant="loading"
      />
    );
  }

  if (error) {
    return (
      <PageState className="dashboard-page" message={error} variant="error" />
    );
  }

  if (!profile || !statistics) {
    return (
      <PageState
        className="dashboard-page"
        message="Dashboard indisponible."
        variant="empty"
      />
    );
  }

  return (
    <main className="dashboard-page">
      <DashboardProfileCard profile={profile} statistics={statistics} />

      <DashboardPerformanceSection
        lastCompletedWeekActivity={lastCompletedWeekActivity}
        lastFourWeeksActivity={lastFourWeeksActivity}
        lastFourWeeksStartDate={lastFourWeeksStartDate}
        averageRecentDistance={averageRecentDistance}
        averageHeartRate={averageHeartRate}
        lastCompletedWeekLabel={lastCompletedWeekLabel}
        lastFourWeeksLabel={lastFourWeeksLabel}
      />

      <DashboardWeeklySection
        completedSessions={lastCompletedWeekActivity.length}
        remainingWeeklySessions={remainingWeeklySessions}
        weeklySessionGoal={weeklySessionGoal}
        lastCompletedWeekDuration={lastCompletedWeekDuration}
        lastCompletedWeekDistance={lastCompletedWeekDistance}
        lastCompletedWeekLabel={lastCompletedWeekLabel}
      />
    </main>
  );
}
