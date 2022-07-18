import StarIcon from "@mui/icons-material/Star";
import { TRANSITION_TIMEOUT } from "../../utils/constants";
import ModelInfo from "./info/ModelInfo";
import scss from "./modelPage.module.scss";
import ModelGraph from "./graph/ModelGraph";
import Fade from "@mui/material/Fade";
import SampleButton from "../../components/SampleButton/SampleButton";

const ModelPage = () => {
  return (
    <div className={scss.root}>
      <ModelInfo />
      <Fade in={true} timeout={TRANSITION_TIMEOUT}>
        <section className={scss.box}>
          <div className={scss.graph}>
            <div className={scss.head}>
              <h2 className={scss.title}>Example: Model structure</h2>
              <div className={scss.score}>
                <StarIcon fontSize="small" />
                <span>Score</span>
                <span className={scss.value}>150</span>
              </div>
            </div>
            <ModelGraph />
          </div>
          <SampleButton />
        </section>
      </Fade>
    </div>
  );
};

export default ModelPage;
