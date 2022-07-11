import StarIcon from "@mui/icons-material/Star";
import { Fade } from "@mui/material";
import ModelButton from "../../../components/UI/buttons/ModelButton/ModelButton";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import scss from "./experimentBox.module.scss";
import ExperimentBoxGraph from "./graph/ExperimentBoxGraph";

const ExperimentBox = () => {
  const { nodes } = useAppSelector((state) => state.experiment);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={scss.root}>
        <div className={scss.box}>
          <div className={scss.head}>
            <h2 className={scss.title}>Model structure</h2>
            <div className={scss.score}>
              <StarIcon fontSize="small" />
              <span>Score</span>
              <span className={scss.value}>-</span>
            </div>
          </div>
          {nodes.length > 0 ? (
            <div className={scss.graph}>
              <ExperimentBoxGraph />
            </div>
          ) : (
            <div className={scss.info}>
              <p className={scss.title}>
                Specify Parameters and Plot the Model
              </p>
            </div>
          )}
        </div>
        <ModelButton disabled>sample</ModelButton>
      </section>
    </Fade>
  );
};

export default ExperimentBox;
