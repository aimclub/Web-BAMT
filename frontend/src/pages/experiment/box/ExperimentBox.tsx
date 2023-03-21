// import StarIcon from "@mui/icons-material/Star";
import Fade from "@mui/material/Fade";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSITION_TIMEOUT } from "../../../assets/utils/constants";
import scss from "./experimentBox.module.scss";
import ExperimentBoxGraph from "./graph/ExperimentBoxGraph";
import { AppRoutes } from "../../../router/routes";
import AppButton from "../../../components/UI/buttons/app/AppButton";

const ExperimentBox = () => {
  const { nodes } = useAppSelector((state) => state.experiment);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={scss.root}>
        <div className={scss.box}>
          <div className={scss.head}>
            <h2 className={scss.title}>Model structure</h2>
            {/* <div className={scss.score}>
              <StarIcon fontSize="small" />
              <span>Score</span>
              <span className={scss.value}>-</span>
            </div> */}
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

        <AppButton
          to={`/${AppRoutes.SAMPLE}`}
          // TODO: disable sample button
          // disabled={!(data && data?.networks.length > 0)}
        >
          sample
        </AppButton>
      </section>
    </Fade>
  );
};

export default ExperimentBox;
