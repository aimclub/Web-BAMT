import { FC } from "react";
import { Link } from "react-router-dom";
import { cl } from "../../assets/utils/classnames";
import { AppRoutes } from "../../router/routes";
import scss from "./logo.module.scss";

const AppLogo: FC<{ className?: string }> = ({ className }) => {
  return <Link className={cl(scss.logo, className)} to={AppRoutes.HOME} />;
};

export default AppLogo;
