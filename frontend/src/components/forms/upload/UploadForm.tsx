import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import scss from "./uploadForm.module.scss";

import { AppRoutes } from "../../../router/routes";
import AppButton from "../../UI/buttons/app/AppButton";
import FileUpload from "../../UI/FileUpload/FileUpload";
import TextFieldForm from "../../UI/textfields/TextFieldForm/TextFieldForm";
import { cl } from "../../../assets/utils/classnames";
import { useEffect, useState } from "react";

const FILE_FORMAT: string[] = [
  "расширение файла .csv с разделителем запятая;",
  "первый столбец должен быть индексом и в header не иметь названия (аналог index_col=0 в pandas);",
  "ориентация файла: столбцы - это признаки, строки - это наблюдения;",
  "все непрерывные признаки должны быть числами с точкой (например, 50.0), все дискретные должны быть строками или целыми числами без точки;",
  "не более 5000 наблюдений.",
];

const UploadForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [datasets] = useState(["test"]);

  const { values, errors, touched, handleChange, handleSubmit, setErrors } =
    useFormik({
      initialValues: {
        display_name: "",
        description:
          "Данный граф построен с использованием различных методов обработки ресурсов полученных из социальных сетей.",
      },
      onSubmit: (values) => {
        console.log("values", values);
      },
      validationSchema: Yup.object().shape({
        display_name: Yup.string().required("required"),
        description: Yup.string().required("required"),
      }),
    });

  const handleExperimentClick = () =>
    files.length > 0 ? handleSubmit() : navigate(AppRoutes.EXPERIMENT);

  useEffect(() => {
    if (datasets.includes(values.display_name))
      setErrors({ ...errors, display_name: "error" });
  }, [values.display_name, datasets, setErrors, errors]);

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
              placeholder="Enter display name ..."
              error={!!errors.display_name}
              helperText={errors.display_name}
              // error={touched.display_name && !!errors.display_name}
              // helperText={touched.display_name && errors.display_name}
            />
            <TextFieldForm
              className={cl(scss.textfield, scss.description)}
              variant="outlined"
              value={values.description}
              onChange={handleChange}
              name="description"
              label="Description"
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
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
              files={files}
              setFiles={setFiles}
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
