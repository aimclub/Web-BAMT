import cl from "classnames";
import { Link } from "react-router-dom";
import { goToPage } from "../../router/routes";
import styles from "./homePage.module.scss";

const HomePage = () => {
  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>Выберите модуль для дальнейшей работы</h2>
      <div className={styles.content}>
        <article className={cl(styles.article, styles.article_social)}>
          <div className={styles.articleContent}>
            <h3 className={cl(styles.title, styles.title_social)}>
              Модуль обрабатывает данные полученные из соц.сетей
            </h3>
            <p className={styles.info}>
              “Example” позволяет посмотреть собранный граф с возможностью
              добавления в список сравнения. “Experiment” - конструктор графа.
            </p>
            <p className={styles.name}>Social Dataset</p>
            <p className={styles.description}>
              Меняется, как и все технологии, внимательно рефлексируя, на
              внешнее воздействие и на технологические изменения в рамках
              IT-индустрии...
            </p>
            <Link
              to={goToPage.example("social")}
              className={cl(styles.link, styles.link_light)}
            >
              Example
            </Link>
            <Link to={goToPage.experiment("social")} className={styles.link}>
              Experiment
            </Link>
          </div>
        </article>
        <div className={styles.line} />
        <article className={cl(styles.article, styles.article_geological)}>
          <div className={styles.articleContent}>
            <h3 className={cl(styles.title, styles.title_geological)}>
              Модуль создает и анализирует Хакатоны
            </h3>
            <p className={styles.info}>
              “Example” позволяет посмотреть собранный граф с возможностью
              добавления в список сравнения. “Experiment” - конструктор графа.
            </p>
            <p className={styles.name}>Geological dataset</p>
            <p className={styles.description}>
              Меняется, как и все технологии, внимательно рефлексируя, на
              внешнее воздействие и на технологические изменения в рамках
              IT-индустрии...
            </p>
            <div>
              <Link
                to={goToPage.example("geological")}
                className={cl(styles.link, styles.link_light)}
              >
                Example
              </Link>
              <Link
                to={goToPage.experiment("geological")}
                className={styles.link}
              >
                Experiment
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
export default HomePage;
