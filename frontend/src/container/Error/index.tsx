import Cookies from "js-cookie";
import type { FC } from "react";
import { isNull } from "lodash";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "utils/redux";
import { RoutePaths } from "utils/router/types";
import { AuthSelectors } from "store/auth/selectors";

const Error: FC = () => {
  const navigate = useNavigate();

  const { signIn } = useAppSelector(AuthSelectors.authSystem);
  const cookieToken = Cookies?.get("token");

  const isAuthenticatedCookie = cookieToken ? true : false;

  const isAuth: boolean =
    isAuthenticatedCookie || !isNull(signIn?.data?.access_token);

  const routeHandler = () => {
    navigate(isAuth ? RoutePaths.Home : RoutePaths.LogIn);
  };

  return (
    <button
      style={{
        backgroundColor: "	#7393B3",
        fontSize: "24px",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={routeHandler}
    >
      This route does not exist
    </button>
  );
};

export default Error;
