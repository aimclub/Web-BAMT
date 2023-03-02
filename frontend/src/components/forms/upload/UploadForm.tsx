import scss from "./uploadForm.module.scss";

import AppButton from "../../UI/buttons/app/AppButton";
import TextFieldUnderline from "../../UI/textfields/TextFieldUnderline/TextFieldUnderline";

const FILE_FORMAT: string[] = [
  "расширение файла .csv с разделителем запятая;",
  "первый столбец должен быть индексом и в header не иметь названия (аналог index_col=0 в pandas);",
  "ориентация файла: столбцы - это признаки, строки - это наблюдения;",
  "все непрерывные признаки должны быть числами с точкой (например, 50.0), все дискретные должны быть строками или целыми числами без точки;",
  "не более 5000 наблюдений.",
];

const UploadForm = () => {
  return (
    <div className={scss.root}>
      <form onSubmit={(event) => event.preventDefault()} className={scss.form}>
        <h3 className={scss.title}>Parametrs</h3>
        <div className={scss.data}>
          <div className={scss.column}>
            <TextFieldUnderline
              className={scss.textfield}
              // value={formik.values.display_name}
              // onChange={formik.handleChange}
              name="display_name"
              label="Display_name"
              // className={scss.displayName}
              placeholder="Name"
            />
            <TextFieldUnderline
              // value={formik.values.display_name}
              // onChange={formik.handleChange}
              name="description"
              label="Description"
              // className={scss.displayName}
              placeholder="Description"
              multiline
              rows={5}
            />
          </div>
          <div className={scss.column}>
            <p className={scss.label}>Upload file</p>
            <p className={scss.subtitle}>
              Требования к структуре и формату файла:
            </p>
            <ul className={scss.format}>
              {FILE_FORMAT.map((item, index) => (
                <li key={index} className={scss.item}>
                  {item}
                </li>
              ))}
            </ul>

            <label>
              <input type="file" />
            </label>
          </div>
        </div>
      </form>
      <AppButton color="secondary">experiment</AppButton>
    </div>
  );
};

export default UploadForm;
