import { useCallback, type FC } from "react";
import { isEmpty } from "lodash";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "components";
import { signUp } from "store/auth/actions";
import { useAppDispatch } from "utils/redux";
import { RoutePaths } from "utils/router/types";
import { registerScheme } from "utils/schemes";

import "./Register.css";

interface TRegisterProps {
  email: string;
  password: string;
  fullName: string;
}

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterProps>({
    mode: "onChange",
    resolver: yupResolver(registerScheme),
  });

  const onSubmit = useCallback(
    (data: TRegisterProps) => {
      dispatch(
        signUp({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        })
      );
      reset();
      navigate(RoutePaths.LogIn);
    },
    [dispatch, navigate, reset]
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
              name="fullName"
              label="Name"
              register={register}
              placeholder="Full Name"
              className="wrapper__input__inp"
            />

            <Input
              name="email"
              label="Email"
              register={register}
              placeholder="Email"
              className="wrapper__input__inp"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              register={register}
              className="wrapper__input__inp"
              placeholder="Enter password"
            />

            <button
              type="submit"
              disabled={!isValid && isDirty}
              className={classNames("wrapper__form__btn", {
                wrapper__form__btn_reg_disabled: !isEmpty(errors),
              })}
            >
              Sign Up
            </button>
          </form>

          <div className="or">
            <hr />
            OR
            <hr />
          </div>

          <button
            className="wrapper__register"
            onClick={() => navigate(RoutePaths.LogIn)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
