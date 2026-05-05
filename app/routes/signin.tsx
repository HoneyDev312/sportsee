import type { Route } from "./+types/home";
import { Connexion } from "../pages/signin/signin";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Profile" }, { name: "", content: "" }];
}

export default function Signin() {
  return <Connexion />;
}
