import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/signin.tsx"),
  layout("./components/layout.tsx", [
    route("profile", "routes/profile.tsx"),
    route("dashboard", "routes/home.tsx"),
    route("conditions-generales", "routes/terms.tsx"),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
