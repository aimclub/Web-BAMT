import { Paper } from "@mui/material";
import { Link, Outlet, useMatch } from "react-router-dom";

import AppLogo from "../../components/AppLogo/AppLogo";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../redux/auth/auth";
import { AppRoutes } from "../../utils/routes";
import styles from "./signinPage.module.scss";

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const isRestorePassword = useMatch(AppRoutes.RESTORE_PASSWORD);
  const isSignin = useMatch(AppRoutes.SIGNIN);

  const handleSkip = () => {
    dispatch(login());
  };

  return (
    <main className={styles.root}>
      <AppLogo className={styles.logo} />
      <Paper className={styles.paper} elevation={3} component="section">
        <Outlet />
        <div className={styles.foot}>
          {isSignin ? (
            <Link to={AppRoutes.SIGNUP} className={styles.footLink}>
              Not registered yet? Register
            </Link>
          ) : (
            <Link to={AppRoutes.SIGNIN} className={styles.footLink}>
              Already registered? Sign In
            </Link>
          )}
          {!isRestorePassword && (
            <Link to={AppRoutes.RESTORE_PASSWORD} className={styles.footLink}>
              Forgot password?
            </Link>
          )}
          <button
            type="button"
            className={styles.footLink}
            onClick={handleSkip}
          >
            SKIP
          </button>
        </div>
      </Paper>
    </main>
  );
};

export default SigninPage;
