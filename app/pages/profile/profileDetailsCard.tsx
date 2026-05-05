import type { UserProfile } from "../../features/userInfo/types";

type ProfileDetailsCardProps = {
  profile: UserProfile;
};

const formatProfileValue = (
  value: string | number | null | undefined,
  unit = "",
) => {
  if (value === null || value === undefined || value === "") {
    return "Non renseigné";
  }

  return `${value}${unit}`;
};

export function ProfileDetailsCard({ profile }: ProfileDetailsCardProps) {
  return (
    <article className="profile-card profile-details">
      <h2>Votre profil</h2>

      <dl>
        <div>
          <dt>Âge</dt>
          <dd>{formatProfileValue(profile.age, " ans")}</dd>
        </div>
        <div>
          <dt>Genre</dt>
          <dd>Non renseigné</dd>
        </div>
        <div>
          <dt>Taille</dt>
          <dd>{formatProfileValue(profile.height, " cm")}</dd>
        </div>
        <div>
          <dt>Poids</dt>
          <dd>{formatProfileValue(profile.weight, " kg")}</dd>
        </div>
      </dl>
    </article>
  );
}
