import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { Input } from "components";
import { signIn } from "store/auth/actions";
import { useAppDispatch } from "utils/redux";
import { RoutePaths } from "utils/router/types";

import "./LogIn.css";
import { loginScheme } from "utils/schemes";

interface TLogInProps {
  email: string;
  password: string;
}

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TLogInProps>({
    mode: "onChange",
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = useCallback(
    (data: TLogInProps) => {
      dispatch(signIn({ email: data.email, password: data.password }));
    },
    [dispatch]
  );

  return (
    <div className="auth_container">
      <div className="auth_wrapper">
        <div className="auth_left_panel">
          <p className="auth_title">AUTH SYSTEM</p>
          <span className="auth_ui_description">Email phishing ⓒ</span>
        </div>
        <div className="auth_right_panel">
          <form className="wrapper__form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              register={register}
              label="Email"
              placeholder="Enter email address"
              className="wrapper__input__inp"
            />

            <Input
              name="password"
              register={register}
              label="Password"
              type="password"
              className="wrapper__input__inp"
              placeholder="Enter password"
            />

            <button
              type="submit"
              disabled={!isValid && isDirty}
              className={classNames("wrapper__form__btn", {
                wrapper__form__btn_login_disabled: !isEmpty(errors),
              })}
            >
              Sign In
            </button>
          </form>

          <div className="or">
            <hr />
            OR
            <hr />
          </div>

          <button
            className="wrapper__register"
            onClick={() => navigate(RoutePaths.Register)}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
