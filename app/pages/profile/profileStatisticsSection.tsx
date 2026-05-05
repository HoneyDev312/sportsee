import type { ProfileStatCard } from "../../features/userInfo/domain";

type ProfileStatisticsSectionProps = {
  memberDate: string;
  statCards: ProfileStatCard[];
};

export function ProfileStatisticsSection({
  memberDate,
  statCards,
}: ProfileStatisticsSectionProps) {
  const displayedMemberDate = memberDate || "date inconnue";

  return (
    <section className="profile-statistics" aria-labelledby="stats-title">
      <div className="profile-statistics-heading">
        <h2 id="stats-title">Vos statistiques</h2>
        <p>depuis le {displayedMemberDate}</p>
      </div>

      <div className="profile-stat-grid">
        {statCards.length > 0 ? (
          statCards.map((stat) => (
            <article className="profile-stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>
                {stat.mainValue || "0"}
                <span>{stat.secondaryValue}</span>
              </strong>
            </article>
          ))
        ) : (
          <article className="profile-stat-card">
            <p>Statistiques</p>
            <strong>
              Indisponibles<span></span>
            </strong>
          </article>
        )}
      </div>
    </section>
  );
}
