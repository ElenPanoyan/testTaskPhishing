import { lazy } from "react";

import { RoutePaths, type TRoutePageType } from "./types";

const Home = lazy(() => import("container/Home"));
const Register = lazy(() => import("container/Register"));
const LogIn = lazy(() => import("container/LogIn"));
const Error = lazy(() => import("container/Error"));

const routesList: TRoutePageType[] = [
  {
    element: Home,
    path: RoutePaths.Home,
    isPrivate: true,
    title: "Home",
  },
  {
    element: LogIn,
    path: RoutePaths.LogIn,
    title: "Login page",
  },
  {
    element: Register,
    path: RoutePaths.Register,
    title: "Register pages",
  },
  {
    element: Error,
    path: RoutePaths.Error,
    title: "Error Page",
  },
];

export default routesList;
