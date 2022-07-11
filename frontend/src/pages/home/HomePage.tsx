import cl from "classnames";
import { Link } from "react-router-dom";
import { goToPage } from "../../router/routes";
import scss from "./homePage.module.scss";

const HomePage = () => {
  return (
    <section className={scss.root}>
      <h2 className={scss.heading}>Выберите модуль для дальнейшей работы</h2>
      <div className={scss.content}>
        <article className={cl(scss.article, scss.article_social)}>
          <div className={scss.articleContent}>
            <h3 className={cl(scss.title, scss.title_social)}>
              Модуль обрабатывает данные полученные из соц.сетей
            </h3>
            <p className={scss.info}>
              “Example” позволяет посмотреть собранный граф с возможностью
              добавления в список сравнения. “Experiment” - конструктор графа.
            </p>
            <p className={scss.name}>Social Dataset</p>
            <p className={scss.description}>
              Меняется, как и все технологии, внимательно рефлексируя, на
              внешнее воздействие и на технологические изменения в рамках
              IT-индустрии...
            </p>
            <Link
              to={goToPage.example("social")}
              className={cl(scss.link, scss.link_light)}
            >
              Example
            </Link>
            <Link to={goToPage.experiment("social")} className={scss.link}>
              Experiment
            </Link>
          </div>
        </article>
        <div className={scss.line} />
        <article className={cl(scss.article, scss.article_geological)}>
          <div className={scss.articleContent}>
            <h3 className={cl(scss.title, scss.title_geological)}>
              Модуль создает и анализирует Хакатоны
            </h3>
            <p className={scss.info}>
              “Example” позволяет посмотреть собранный граф с возможностью
              добавления в список сравнения. “Experiment” - конструктор графа.
            </p>
            <p className={scss.name}>Geological dataset</p>
            <p className={scss.description}>
              Меняется, как и все технологии, внимательно рефлексируя, на
              внешнее воздействие и на технологические изменения в рамках
              IT-индустрии...
            </p>
            <div>
              <Link
                to={goToPage.example("geological")}
                className={cl(scss.link, scss.link_light)}
              >
                Example
              </Link>
              <Link
                to={goToPage.experiment("geological")}
                className={scss.link}
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
