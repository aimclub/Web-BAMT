import WorkIcon from "@mui/icons-material/Work";
import { useMatch, useParams } from "react-router-dom";

import { cl } from "../../../assets/utils/classnames";
import { AppRoutes } from "../../../router/routes";
import { formatStringToCapitalize } from "../../../assets/utils/format";

import scss from "./headerLine.module.scss";

// TODO: update

const HeaderLine = () => {
  const { model } = useParams();
  const isCorrectModel = model === "social" || model === "geological";
  const isExperiment = useMatch(`${AppRoutes.MODEL}/${AppRoutes.EXPERIMENT}`);
  const isSample = useMatch(`${AppRoutes.MODEL}/${AppRoutes.SAMPLE}`);
  const isTeam = useMatch(AppRoutes.TEAM);

  return (
    <div className={cl(scss.line, isCorrectModel && scss[`line_${model}`])}>
      <div className={scss.icon}>
        <WorkIcon sx={{ height: "14px" }} />
      </div>

      <h1 className={scss.title}>
        {isCorrectModel
          ? `${formatStringToCapitalize(model)} Dataset - ${
              isExperiment ? "Experiment" : isSample ? "Sample" : "Example"
            }`
          : isTeam
          ? "Team"
          : "Showcase"}
      </h1>
    </div>
  );
};

export default HeaderLine;
