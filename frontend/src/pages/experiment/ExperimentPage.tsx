import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { cleanExperiment } from "../../redux/experiment/experiment";
import ExperimentBox from "./box/ExperimentBox";
import styles from "./experimentPage.module.scss";
import ExperimentLoader from "./loader/ExperimentLoader";
import ExperimentParameters from "./parameters/ExperimentParameters";

const ExperimentPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanExperiment());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <ExperimentParameters />
      <ExperimentBox />
      <ExperimentLoader />
    </div>
  );
};

export default ExperimentPage;
