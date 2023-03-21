import Paper from "@mui/material/Paper";
import { Link, Navigate, Route, Routes, useMatch } from "react-router-dom";

import RestorePasswordForm from "../../components/forms/auth/RestorePasswordForm";
import SigninForm from "../../components/forms/auth/SigninForm";
import SignupForm from "../../components/forms/auth/SignupForm";

import Logo from "../../components/logo/Logo";
import { AppRoutes } from "../../router/routes";
import scss from "./signinPage.module.scss";

const SigninPage = () => {
  const isRestorePassword = useMatch(AppRoutes.RESTORE_PASSWORD);
  const isSignin = useMatch(AppRoutes.SIGNIN);

  return (
    <main className={scss.root}>
      <Logo className={scss.logo} />
      <Paper className={scss.paper} elevation={3} component="section">
        <Routes>
          <Route
            path={AppRoutes.MAIN}
            element={<Navigate to={AppRoutes.SIGNIN} />}
          />
          <Route path={AppRoutes.SIGNIN} element={<SigninForm />} />
          <Route path={AppRoutes.SIGNUP} element={<SignupForm />} />
          <Route
            path={AppRoutes.RESTORE_PASSWORD}
            element={<RestorePasswordForm />}
          />
          <Route path="*" element={<Navigate to={AppRoutes.SIGNIN} />} />
        </Routes>
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
