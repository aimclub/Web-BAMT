import { Fade } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ModelButton from "../../components/UI/buttons/ModelButton/ModelButton";
import { TRANSITION_TIMEOUT } from "../../utils/constants";
import ModelInfo from "./info/ModelInfo";
import scss from "./modelPage.module.scss";
import ModelGraph from "./graph/ModelGraph";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../router/routes";

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
          <Link to={AppRoutes.SAMPLE} className={scss.link}>
            <ModelButton>sample</ModelButton>
          </Link>
        </section>
      </Fade>
    </div>
  );
};

export default ModelPage;
