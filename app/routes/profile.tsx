import type { Route } from "./+types/profile";
import { ProfileInfo } from "../pages/profile/profile";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Profile" }, { name: "", content: "" }];
}

export default function Profile() {
  return <ProfileInfo />;
}
