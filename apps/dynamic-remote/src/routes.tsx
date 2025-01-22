import type { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/dynamicRemote",
    lazy: () => import("./App").then((mod) => ({ Component: mod.default }))
  }
];

export default routes;
