import type { FC } from "react";

export type TRoutePageType = {
  element: FC;
  isPrivate?: boolean;
  path: string;
  title: string;
};

export enum RoutePaths {
  Home = "/",
  LogIn = "/login",
  Register = "/register",
  Error = "*",
}
