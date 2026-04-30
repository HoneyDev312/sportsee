import type { Route } from "./+types/home";
import { ProfileInfo } from "../profile/profile";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Profile" }, { name: "", content: "" }];
}

export default function Profile() {
  return <ProfileInfo />;
}
