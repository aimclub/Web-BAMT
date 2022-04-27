import StarIcon from "@mui/icons-material/Star";
import { Fade } from "@mui/material";
import ModelButton from "../../../components/UI/buttons/ModelButton/ModelButton";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import styles from "./experimentBox.module.scss";
import ExperimentBoxGraph from "./graph/ExperimentBoxGraph";

const ExperimentBox = () => {
  const { nodes } = useAppSelector((state) => state.experiment);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={styles.root}>
        <div className={styles.box}>
          <div className={styles.head}>
            <h2 className={styles.title}>Model structure</h2>
            <div className={styles.score}>
              <StarIcon fontSize="small" />
              <span>Score</span>
              <span className={styles.value}>-</span>
            </div>
          </div>
          {nodes.length > 0 ? (
            <div className={styles.graph}>
              <ExperimentBoxGraph />
            </div>
          ) : (
            <div className={styles.info}>
              <p className={styles.title}>
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
