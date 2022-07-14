import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useTrainDisabled } from "../../../hooks/useTrainDisabled";
import { cleanExperiment } from "../../../redux/experiment/experiment";
import { SCORE_FUNCTION_VALUES } from "../../../utils/model";
import ModelButton from "../../UI/buttons/ModelButton/ModelButton";
import AppMultiSelect from "../../UI/selects/AppMultiSelect/AppMultiSelect";
import AppSelect from "../../UI/selects/AppSelect/AppSelect";
import TextFieldUnderline from "../../UI/textfields/TextFieldUnderline/TextFieldUnderline";
import scss from "./experimentForm.module.scss";
import { validationSchema } from "./ExperimentFormValidator";

const initialValues = {
  display_name: "",
  logit: "",
  mixture: "",
  score_function: "",
  root_nodes: [] as string[],
};

export type IExperimentParameters = typeof initialValues;

const ExperimentForm: FC<{
  onSubmit: (values: IExperimentParameters) => void;
  onTrain: (values: IExperimentParameters) => void;
  rootNodes: string[];
}> = ({ onSubmit, onTrain, rootNodes }) => {
  const dispatch = useAppDispatch();
  const [parametersCorrect, setParametersCorrect] = useState(false);
  const { trainDisabled } = useTrainDisabled(parametersCorrect);

  const formik = useFormik({
    initialValues,
    initialErrors: { logit: "" },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    dispatch(cleanExperiment());
  }, [formik.values.root_nodes, dispatch]);

  useEffect(() => {
    setParametersCorrect(formik.isValid && !!formik.values.display_name);
  }, [formik.isValid, formik.values.display_name]);

  return (
    <form
      className={scss.root}
      onSubmit={formik.handleSubmit}
      id="model_parameters"
    >
      <div className={scss.content}>
        <h2 className={scss.title}>Model Parameters</h2>
        <div>
          <TextFieldUnderline
            value={formik.values.display_name}
            onChange={formik.handleChange}
            name="display_name"
            label="Display_name"
            className={scss.displayName}
            placeholder="Name"
          />
          <AppSelect
            className={scss.item}
            options={["True", "False"]}
            value={formik.values.logit}
            onChange={formik.handleChange}
            name="logit"
            label="Logit"
            helperText="select node type"
          />
          <AppSelect
            className={scss.item}
            options={["True", "False"]}
            value={formik.values.mixture}
            onChange={formik.handleChange}
            name="mixture"
            label="Mixture"
            helperText="select node type"
          />
          <AppSelect
            className={scss.item}
            options={SCORE_FUNCTION_VALUES}
            value={formik.values.score_function}
            onChange={formik.handleChange}
            name="score_function"
            label="Score function"
            helperText="select node type"
          />
          <AppMultiSelect
            className={scss.item}
            options={rootNodes}
            value={formik.values.root_nodes}
            onChange={formik.handleChange}
            name="root_nodes"
            label="Root nodes"
            helperText="select node type"
          />
        </div>
      </div>

      <ModelButton
        type="submit"
        form="model_parameters"
        disabled={!formik.isValid}
      >
        Start edges
      </ModelButton>
      <ModelButton
        disabled={trainDisabled}
        onClick={() => onTrain(formik.values)}
      >
        Train the model
      </ModelButton>
    </form>
  );
};

export default ExperimentForm;
