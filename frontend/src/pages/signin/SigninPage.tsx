import Paper from "@mui/material/Paper";
import { Link, Outlet, useMatch } from "react-router-dom";

import Logo from "../../components/logo/Logo";
// import { useAppDispatch } from "../../hooks/redux";
// import { login } from "../../redux/auth/auth";
import { AppRoutes } from "../../router/routes";
import scss from "./signinPage.module.scss";

const SigninPage = () => {
  // const dispatch = useAppDispatch();
  const isRestorePassword = useMatch(AppRoutes.RESTORE_PASSWORD);
  const isSignin = useMatch(AppRoutes.SIGNIN);

  /*  const handleSkip = () => {
    dispatch(login({ email: "not auth", token: "" }));
  }; */

  return (
    <main className={scss.root}>
      <Logo className={scss.logo} />
      <Paper className={scss.paper} elevation={3} component="section">
        <Outlet />
        <div className={scss.foot}>
          {isSignin ? (
            <Link to={AppRoutes.SIGNUP} className={scss.footLink}>
              Not registered yet? Register
            </Link>
          ) : (
            <Link to={AppRoutes.SIGNIN} className={scss.footLink}>
              Already registered? Sign In
            </Link>
          )}
          {!isRestorePassword && (
            <Link to={AppRoutes.RESTORE_PASSWORD} className={scss.footLink}>
              Forgot password?
            </Link>
          )}
          {/* <button type="button" className={scss.footLink} onClick={handleSkip}>
            SKIP
          </button> */}
        </div>
      </Paper>
    </main>
  );
};

export default SigninPage;
