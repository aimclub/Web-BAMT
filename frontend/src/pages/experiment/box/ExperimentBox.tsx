import Fade from "@mui/material/Fade";

import { TRANSITION_TIMEOUT } from "../../../assets/utils/constants";
import AppButton from "../../../components/UI/buttons/app/AppButton";
import { useAppSelector } from "../../../hooks/redux";
import { AppRoutes } from "../../../router/routes";
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

        <AppButton to={`/${AppRoutes.SAMPLE}`}>sample</AppButton>
      </section>
    </Fade>
  );
};

export default ExperimentBox;
