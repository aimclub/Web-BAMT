import WorkIcon from "@mui/icons-material/Work";
import { Route, Routes, useMatch } from "react-router-dom";

import { cl } from "../../../assets/utils/classnames";
import { AppRoutes } from "../../../router/routes";

import scss from "./headerLine.module.scss";

const HeaderLine = () => {
  const isExperiment = useMatch(AppRoutes.EXPERIMENT);
  const isSample = useMatch(AppRoutes.SAMPLE);

  return (
    <div
      className={cl(
        scss.root,
        isExperiment && scss.experiment,
        isSample && scss.sample
      )}
    >
      <div className={scss.icon}>
        <WorkIcon sx={{ height: "14px" }} />
      </div>

      <h1 className={scss.title}>
        <Routes>
          <Route index element="Main page" />
          <Route path={AppRoutes.EXPERIMENT} element="Experiment" />
          <Route path={AppRoutes.SAMPLE} element="Sample" />
          <Route path={AppRoutes.TEAM} element="Team" />
        </Routes>
      </h1>
    </div>
  );
};

export default HeaderLine;
