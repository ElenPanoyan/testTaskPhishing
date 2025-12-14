import { useCallback, useEffect, type FC } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { PhishingSelectors } from "store/phishing/selectors";
import { useAppDispatch, useAppSelector } from "utils/redux";
import { clearSignIn, userProfile } from "store/auth/actions";
import { phishingAttempts, phishingPost } from "store/phishing/actions";
import { Input, PhishingEmailCard, TPhishingEmailCardProps } from "components";

import "./Home.css";

import LogOut from "assets/log_out.png";

export interface TPhishingProps {
  email: string;
}

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const phishing = useAppSelector(PhishingSelectors.phishing);

  const logOutHandler = () => {
    Cookies.remove("token");
    dispatch(clearSignIn());

    window.location.reload();
  };

  const renderPhishingList = phishing?.phishingAttempts?.phishingList?.map(
    ({ id, email, status, content }: TPhishingEmailCardProps) => (
      <PhishingEmailCard
        key={id}
        id={id}
        email={email}
        status={status}
        content={content}
      />
    )
  );

  const { register, reset, handleSubmit } = useForm<TPhishingProps>({
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: TPhishingProps) => {
      dispatch(phishingPost({ email: data.email }));
      reset();
    },
    [dispatch, reset]
  );

  useEffect(() => {
    dispatch(userProfile());
    dispatch(phishingAttempts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home_wrapper">
      <header className="header">
        <button className="wrapper__head_btn" onClick={logOutHandler}>
          <img src={LogOut} alt="Log out" />{" "}
        </button>
      </header>
      <div className="wrapper__container">
        <form onSubmit={handleSubmit(onSubmit)} className="wrapper__phishing">
          <Input
            register={register}
            name="email"
            placeholder="Phishing email"
            className="wrapper__phishing__inp"
          />

          <button className="wrapper__phishing_btn">SUBMIT</button>
        </form>
      </div>

      <div className="wrapper__list">{renderPhishingList}</div>
    </div>
  );
};

export default Home;
