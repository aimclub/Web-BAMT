import WorkIcon from "@mui/icons-material/Work";
import cl from "classnames";
import { useMatch, useParams } from "react-router-dom";
import { AppRoutes } from "../../../router/routes";
import { stringToCapitalize } from "../../../utils/string";
import scss from "./headerLine.module.scss";

const HeaderLine = () => {
  const { model } = useParams();
  const isCorrectModel = model === "social" || model === "geological";
  const isExperiment = useMatch(`${AppRoutes.MODEL}/${AppRoutes.EXPERIMENT}`);
  const isSample = useMatch(`${AppRoutes.MODEL}/${AppRoutes.SAMPLE}`);

  return (
    <div
      className={cl(
        scss.line,
        isCorrectModel ? scss[`line_${model}`] : scss.line_home
      )}
    >
      <div className={scss.icon}>
        <WorkIcon sx={{ height: "14px" }} />
      </div>
      <h1 className={scss.title}>
        {isCorrectModel
          ? `${stringToCapitalize(model)} Dataset - ${
              isExperiment ? "Experiment" : isSample ? "Sample" : "Example"
            }`
          : "Showcase"}
      </h1>
    </div>
  );
};

export default HeaderLine;
