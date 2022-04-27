import WorkIcon from "@mui/icons-material/Work";
import cl from "classnames";
import { useMatch, useParams } from "react-router-dom";
import { AppRoutes } from "../../../utils/routes";
import { stringToCapitalize } from "../../../utils/string";
import styles from "./appHeaderLine.module.scss";

const AppHeaderLine = () => {
  const { model } = useParams();
  const isCorrectModel = model === "social" || model === "geological";
  const isExperiment = useMatch(`${AppRoutes.MODEL}/${AppRoutes.EXPERIMENT}`);
  const isSample = useMatch(`${AppRoutes.MODEL}/${AppRoutes.SAMPLE}`);

  return (
    <div
      className={cl(
        styles.line,
        isCorrectModel ? styles[`line_${model}`] : styles.line_home
      )}
    >
      <div className={styles.icon}>
        <WorkIcon sx={{ height: "14px" }} />
      </div>
      <h1 className={styles.title}>
        {isCorrectModel
          ? `${stringToCapitalize(model)} Dataset - ${
              isExperiment ? "Experiment" : isSample ? "Sample" : "Example"
            }`
          : "Showcase"}
      </h1>
    </div>
  );
};

export default AppHeaderLine;
