import type { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/remote",
    lazy: () => import("./App").then((mod) => ({ Component: mod.default }))
  }
];

export default routes;
