import { Fade } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ModelButton from "../../components/UI/buttons/ModelButton/ModelButton";
import { TRANSITION_TIMEOUT } from "../../utils/constants";
import ModelInfo from "./info/ModelInfo";
import styles from "./modelPage.module.scss";
import ModelGraph from "./graph/ModelGraph";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../utils/routes";

const ModelPage = () => {
  return (
    <div className={styles.root}>
      <ModelInfo />
      <Fade in={true} timeout={TRANSITION_TIMEOUT}>
        <section className={styles.box}>
          <div className={styles.graph}>
            <div className={styles.head}>
              <h2 className={styles.title}>Example: Model structure</h2>
              <div className={styles.score}>
                <StarIcon fontSize="small" />
                <span>Score</span>
                <span className={styles.value}>150</span>
              </div>
            </div>
            <ModelGraph />
          </div>
          <Link to={AppRoutes.SAMPLE} className={styles.link}>
            <ModelButton>sample</ModelButton>
          </Link>
        </section>
      </Fade>
    </div>
  );
};

export default ModelPage;
