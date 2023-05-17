import scss from "./uploadForm.module.scss";

import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { data_managerAPI } from "../../../API/data_manager/data_managerAPI";
import { cl } from "../../../assets/utils/classnames";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";
import { useUser } from "../../../hooks/useUser";
import { AppRoutes } from "../../../router/routes";
import AlertError from "../../UI/alerts/error/AlertError";
import AppButton from "../../UI/buttons/app/AppButton";
import FileUpload from "../../UI/FileUpload/FileUpload";
import TextFieldForm from "../../UI/textfields/TextFieldForm/TextFieldForm";
import { FILE_FORMAT, validationSchema } from "./UploadFormValidation";

const UploadForm = () => {
  const navigate = useNavigate();

  const { username: user } = useUser();
  const { data: datasets, isError: isErrorGetDatasets } =
    data_managerAPI.useGetDatasetsQuery({ user });

  const [uploadDataset, { isLoading, isError, isSuccess, error }] =
    data_managerAPI.useUploadDatasetMutation();

  const [files, setFiles] = useState<File[]>([]);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      display_name: "",
      description:
        "Данный граф построен с использованием различных методов обработки ресурсов полученных из социальных сетей.",
    },
    onSubmit: (values) => {
      if (isRepeatDisplayName) return;
      uploadDataset({
        owner: user,
        name: values.display_name,
        description: values.description,
        file: files[0],
      });
    },
    validationSchema,
  });

  const handleExperimentClick = () =>
    files.length > 0 ? handleSubmit() : navigate(AppRoutes.EXPERIMENT);

  const isRepeatDisplayName = useMemo(
    () => Boolean(datasets && datasets[values.display_name]),
    [datasets, values.display_name]
  );

  useEffect(() => {
    if (isSuccess) navigate(AppRoutes.EXPERIMENT);
  }, [isSuccess, navigate]);

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
              error={
                (touched.display_name && !!errors.display_name) ||
                isRepeatDisplayName
              }
              helperText={
                isRepeatDisplayName
                  ? VALIDATION_MESSAGES.unique("Dataset")
                  : touched.display_name && errors.display_name
              }
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
      <AppButton onClick={handleExperimentClick} disabled={isLoading}>
        experiment
      </AppButton>

      <AlertError
        isError={isErrorGetDatasets}
        message={`ERROR on get datasets`}
      />
      <AlertError
        isError={isError}
        message={`ERROR on upload dataset. ${
          (error as { data?: { message?: string } })?.data?.message || ""
        }`}
      />
    </div>
  );
};

export default UploadForm;
