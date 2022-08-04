import { useFormik } from "formik";
import { FC, useCallback, useEffect } from "react";
import { SCORE_FUNCTION_VALUES } from "../../../assets/utils/constants";
import { createNodes } from "../../../assets/utils/graph";
import { useAppDispatch } from "../../../hooks/redux";
import {
  cleanExperiment,
  setLinks,
  setNodes,
} from "../../../redux/experiment/experiment";
import AppButton from "../../UI/buttons/app/AppButton";
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
  onTrain: (values: IExperimentParameters) => void;
  rootNodes: string[];
}> = ({ onTrain, rootNodes }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues,
    initialErrors: { logit: "" },
    validationSchema,
    onSubmit: onTrain,
  });

  useEffect(() => {
    dispatch(cleanExperiment());
  }, [formik.values.root_nodes, dispatch]);

  const handleStartEdges = useCallback(() => {
    dispatch(setNodes(createNodes(rootNodes)));
    dispatch(setLinks([]));
  }, [dispatch, rootNodes]);

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

      <AppButton onClick={handleStartEdges} disabled={!(rootNodes.length > 0)}>
        Start edges
      </AppButton>
      <AppButton type="submit" disabled={!formik.isValid}>
        Train the model
      </AppButton>
    </form>
  );
};

export default ExperimentForm;
