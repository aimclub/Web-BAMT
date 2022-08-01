import { useEffect } from "react";
import AppButton from "../../components/UI/buttons/app/AppButton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearSample } from "../../redux/sample/sample";
import { goToPage } from "../../router/routes";
import SampleСomparison from "./comparison/SampleComparison";
import SampleNetwork from "./network/SampleNetwork";
import scss from "./samplePage.module.scss";

const SamplePage = () => {
  const dispatch = useAppDispatch();
  const { model } = useAppSelector((state) => state.model);

  useEffect(() => {
    return () => {
      dispatch(clearSample());
    };
  }, [dispatch]);

  return (
    <div className={scss.root}>
      <section className={scss.info}>
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
        <div className={scss.btns}>
          <AppButton to={goToPage.example(model)} variant="outlined">
            example
          </AppButton>
          <AppButton to={goToPage.experiment(model)} variant="outlined">
            experiment
          </AppButton>
        </div>
      </section>
      <SampleNetwork />
      <SampleСomparison />
    </div>
  );
};

export default SamplePage;
