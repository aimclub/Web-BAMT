import { Link } from "react-router-dom";

import geolocicalData from "../../../assets/data/geolocical.json";
import socailData from "../../../assets/data/social.json";

import ModelButton from "../../../components/UI/buttons/ModelButton/ModelButton";
import { useAppSelector } from "../../../hooks/redux";
import { TRANSITION_TIMEOUT } from "../../../assets/utils/constants";
import { AppRoutes } from "../../../router/routes";
import ModelInfoItem from "./item/ModelInfoItem";
import scss from "./modelInfo.module.scss";
import Fade from "@mui/material/Fade";

const ModelInfo = () => {
  const { model } = useAppSelector((s) => s.model);

  const data = model === "social" ? socailData : geolocicalData;

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={scss.root}>
        <div className={scss.info}>
          <h2 className={scss.title}>Information</h2>
          <p className={scss.nameLabel}>
            Display_name: <span className={scss.name}>{data.name}</span>
          </p>
          <p className={scss.description}>{data.description}</p>
          <ModelInfoItem name={"Logit"} value={`${data.logit}`} />
          <ModelInfoItem name={"Mixture"} value={`${data.mixture}`} />
          <ModelInfoItem name={"Score function"} value={data.score_function} />
          <ModelInfoItem name={"Root nodes"} value={data.root_nodes} />
          <p className={scss.additional}>
            “New experiment” открывает конструктор и создает граф с новыми
            параметрами.
          </p>
          <p className={scss.additional}>
            “Sample” добавялет построенный граф с указанными параметрами в
            список сравнения
          </p>
        </div>
        <Link to={AppRoutes.EXPERIMENT} className={scss.link}>
          <ModelButton>new experiment</ModelButton>
        </Link>
      </section>
    </Fade>
  );
};

export default ModelInfo;
