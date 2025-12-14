import type { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";

import "./HelmetLayout.css";
import classNames from "classnames";
import { RoutePaths } from "utils/router/types";

interface HelmetProps {
  path: string;
  title: string;
  children: ReactElement;
}

const HelmetLayout: FC<HelmetProps> = ({ children, title, path }) => (
  <div
    className={classNames("helmet_wrapper", {
      helmet_wrapper__home: path === RoutePaths.Home,
    })}
  >
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {children}
  </div>
);

export default HelmetLayout;
