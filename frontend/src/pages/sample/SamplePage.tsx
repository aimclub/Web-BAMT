import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { clearSample } from "../../redux/sample/sample";
import SampleСomparison from "./comparison/SampleComparison";
import SampleNetwork from "./network/SampleNetwork";
import scss from "./samplePage.module.scss";

const SamplePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSample());
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
          Нажатие на узел связи отобразит параметры сети
        </p>
      </section>
      <SampleNetwork />
      <SampleСomparison />
    </div>
  );
};

export default SamplePage;
