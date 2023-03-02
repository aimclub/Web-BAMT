import scss from "./mainPage.module.scss";

import UploadForm from "../../components/forms/upload/UploadForm";

const MainPage = () => {
  return (
    <section className={scss.root}>
      <h2 className={scss.title}>Загрузка данных</h2>
      <p className={scss.description}>
        Для работы с требуемым графом и получения информаци укажите имя файла,
        добавьте описание и загрузите файл с проектом.
      </p>
      <UploadForm />
    </section>
  );
};

export default MainPage;
