import { Fade } from "@mui/material";
import { Link } from "react-router-dom";

import geolocicalData from "../../../assets/data/geolocical.json";
import socailData from "../../../assets/data/social.json";

import ModelButton from "../../../components/UI/buttons/ModelButton/ModelButton";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import { AppRoutes } from "../../../router/routes";
import ModelInfoItem from "./item/ModelInfoItem";
import styles from "./modelInfo.module.scss";

const ModelInfo = () => {
  const { model } = useAppSelector((s) => s.model);

  const data = model === "social" ? socailData : geolocicalData;

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={styles.root}>
        <div className={styles.info}>
          <h2 className={styles.title}>Information</h2>
          <p className={styles.nameLabel}>
            Display_name: <span className={styles.name}>{data.name}</span>
          </p>
          <p className={styles.description}>{data.description}</p>
          <ModelInfoItem name={"Logit"} value={`${data.logit}`} />
          <ModelInfoItem name={"Mixture"} value={`${data.mixture}`} />
          <ModelInfoItem name={"Score function"} value={data.score_function} />
          <ModelInfoItem name={"Root nodes"} value={data.root_nodes} />
          <p className={styles.additional}>
            “New experiment” открывает конструктор и создает граф с новыми
            параметрами.
          </p>
          <p className={styles.additional}>
            “Sample” добавялет построенный граф с указанными параметрами в
            список сравнения
          </p>
        </div>
        <Link to={AppRoutes.EXPERIMENT} className={styles.link}>
          <ModelButton>new experiment</ModelButton>
        </Link>
      </section>
    </Fade>
  );
};

export default ModelInfo;
