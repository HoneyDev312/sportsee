import type { UserProfile } from "../../features/userInfo/types";

type ProfileSummaryCardProps = {
  profile: UserProfile;
  memberDate: string;
};

export function ProfileSummaryCard({
  profile,
  memberDate,
}: ProfileSummaryCardProps) {
  const fullName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Utilisateur";
  const profilePicture = profile.profilePicture || "/favicon.ico";
  const displayedMemberDate = memberDate || "date inconnue";

  return (
    <article className="profile-card profile-summary">
      <img
        src={profilePicture}
        alt={fullName}
        className="profile-picture"
      />

      <div>
        <h1>{fullName}</h1>
        <p>Membre depuis le {displayedMemberDate}</p>
      </div>
    </article>
  );
}
