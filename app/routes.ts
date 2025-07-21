import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/login.tsx", { id: "login-page" }),
  route("/home", "routes/home.tsx"),
  route("/register", "routes/register.tsx"),
] satisfies RouteConfig;
