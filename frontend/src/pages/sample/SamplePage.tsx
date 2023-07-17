import { useEffect } from "react";
import AppButton from "../../components/UI/buttons/app/AppButton";
import { useAppDispatch } from "../../hooks/redux";
import { clearSample } from "../../redux/sample/sample";
import { AppRoutes } from "../../router/routes";

import SampleСomparison from "./comparison/SampleComparison";
import SampleNetwork from "./network/SampleNetwork";
import scss from "./samplePage.module.scss";

const SamplePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSample());
    };
  }, [dispatch]);

  return (
    <div className={scss.root}>
      <section className={scss.panel}>
        <div className={scss.info}>
          <h2 className={scss.title}>Сравнение сетей между собой</h2>
          <p className={scss.text}>
            Выпадающий список содержит созданные графы. Сервис поможет сравнить
            параметры между собой.
          </p>
          <p className={scss.text}>
            Равные друг другу линии связи выделены цветом.
          </p>
          <p className={scss.text}>
            Нажатие на узел связи распределение значений в узлах.
          </p>
          <p className={scss.text}>
            Также для каждого узла помимо вероятностного биплота будет
            отображаться величина дивергенции Йенсена - Шеннона, показывающая
            меру похожести исходного распределения признака и распределения,
            моделируемого в узле байесовской сети (чем меньше, тем более похожи
            распределения).
          </p>
          <p className={scss.text}>
            Если вы выбрали сравнение с классической моделью (Comparision with
            classical algorithm), то также отобразится величина дивергенции и
            для классической модели, с которой вы можете сравнить свою модель.
          </p>
          <p className={scss.text}>
            Классическая модель — это модель, в которой все связи по умолчанию
            моделируются с помощью линейной регрессии и логистической регрессии,
            а структурное обучение проводится с помощью оценочной функции К2.
          </p>
        </div>

        <AppButton to={`/${AppRoutes.EXPERIMENT}`}>experiment</AppButton>
      </section>
      <div className={scss.content}>
        <SampleNetwork />
        <SampleСomparison />
      </div>
    </div>
  );
};

export default SamplePage;
