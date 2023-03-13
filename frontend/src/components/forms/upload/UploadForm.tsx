import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import scss from "./uploadForm.module.scss";

import { AppRoutes } from "../../../router/routes";
import AppButton from "../../UI/buttons/app/AppButton";
import FileUpload from "../../UI/FileUpload/FileUpload";
import TextFieldForm from "../../UI/textfields/TextFieldForm/TextFieldForm";

const FILE_FORMAT: string[] = [
  "расширение файла .csv с разделителем запятая;",
  "первый столбец должен быть индексом и в header не иметь названия (аналог index_col=0 в pandas);",
  "ориентация файла: столбцы - это признаки, строки - это наблюдения;",
  "все непрерывные признаки должны быть числами с точкой (например, 50.0), все дискретные должны быть строками или целыми числами без точки;",
  "не более 5000 наблюдений.",
];

const UploadForm = () => {
  const navigate = useNavigate();

  const { values, errors, isValid, handleChange, handleSubmit } = useFormik({
    initialValues: {
      display_name: "",
      description:
        "Данный граф построен с использованием различных методов обарботки ресурсов полученных из социальных сетей.",
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
    validationSchema: Yup.object().shape({
      display_name: Yup.string().required("required"),
      description: Yup.string().required("required"),
    }),
    validateOnMount: true,
  });

  const handleExperimentClick = () =>
    isValid ? handleSubmit() : navigate(AppRoutes.EXPERIMENT);

  return (
    <div className={scss.root}>
      <form onSubmit={handleSubmit} className={scss.form}>
        <h3 className={scss.title}>Parametrs</h3>
        <div className={scss.data}>
          <div className={scss.column}>
            <TextFieldForm
              className={scss.textfield}
              value={values.display_name}
              onChange={handleChange}
              name="display_name"
              label="Display_name"
              error={!!errors.display_name}
              helperText={errors.display_name}
            />
            <TextFieldForm
              className={scss.textfield}
              value={values.description}
              name="description"
              label="Description"
              error={!!errors.description}
              helperText={errors.description}
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

            <FileUpload
              accept={{ "text/csv": [".csv"] }}
              className={scss.upload}
            />
          </div>
        </div>
      </form>
      <AppButton onClick={handleExperimentClick} color="secondary">
        experiment
      </AppButton>
    </div>
  );
};

export default UploadForm;
