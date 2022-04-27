import cl from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../utils/routes";
import styles from "./appLogo.module.scss";

const AppLogo: FC<{ className?: string }> = ({ className }) => {
  return <Link className={cl(styles.logo, className)} to={AppRoutes.HOME} />;
};

export default AppLogo;
