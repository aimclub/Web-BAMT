import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { clearSample } from "../../redux/sample/sample";
import SampleСomparison from "./comparison/SampleComparison";
import SampleNetwork from "./network/SampleNetwork";
import styles from "./samplePage.module.scss";

const SamplePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSample());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <section className={styles.info}>
        <h2 className={styles.title}>Сравнение сетей между собой</h2>
        <p className={styles.text}>
          Выпадающий список содержит созданные графы. Сервис поможет сравнить
          параметры между собой.
        </p>
        <p className={styles.text}>
          Равные друг другу линии связи выделены цветом.
        </p>
        <p className={styles.text}>
          Нажатие на узел связи отобразит параметры сети
        </p>
      </section>
      <SampleNetwork />
      <SampleСomparison />
    </div>
  );
};

export default SamplePage;
