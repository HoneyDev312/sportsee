import { Outlet, redirect } from "react-router";
import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("Cookie") ?? "";
  const isLoggedIn = cookie.includes("authToken=");

  if (!isLoggedIn) {
    throw redirect("/");
  }

  return null;
}

export default function Layout() {
  return (
    <div>
      <nav>TEST</nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
