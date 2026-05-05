import { PageState } from "../../components/pageState";
import { useProfileData } from "../../hooks/profileData";
import { ProfileDetailsCard } from "./profileDetailsCard";
import "./profile.css";
import { ProfileStatisticsSection } from "./profileStatisticsSection";
import { ProfileSummaryCard } from "./profileSummaryCard";

export function ProfileInfo() {
  const { profile, memberDate, statCards, isLoading, error } =
    useProfileData();

  if (isLoading) {
    return (
      <PageState
        className="profile-page"
        message="Chargement du profil..."
        variant="loading"
      />
    );
  }

  if (error) {
    return <PageState className="profile-page" message={error} variant="error" />;
  }

  if (!profile) {
    return (
      <PageState
        className="profile-page"
        message="Profil indisponible."
        variant="empty"
      />
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-left-column">
        <ProfileSummaryCard profile={profile} memberDate={memberDate} />
        <ProfileDetailsCard profile={profile} />
      </section>

      <ProfileStatisticsSection memberDate={memberDate} statCards={statCards} />
    </main>
  );
}
