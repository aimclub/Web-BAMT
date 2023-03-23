import { useFormik } from "formik";
import { FC, useCallback, useEffect, useMemo } from "react";

import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import { data_managerAPI } from "../../../API/data_manager/data_managerAPI";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import { IExperimentFormValues } from "../../../API/experiment/experimentTypes";
import {
  NETWORKS_LIMIT,
  SCORE_FUNCTION_VALUES,
  VALIDATION_MESSAGES,
} from "../../../assets/utils/constants";
import { createNodes } from "../../../assets/utils/graph";
import { useAppDispatch } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import {
  cleanExperiment,
  setLinks,
  setNodes,
} from "../../../redux/experiment/experiment";
import AlertError from "../../UI/alerts/error/AlertError";
import AppButton from "../../UI/buttons/app/AppButton";
import AppMultiSelect from "../../UI/selects/AppMultiSelect/AppMultiSelect";
import AppSelect from "../../UI/selects/AppSelect/AppSelect";
import TextFieldForm from "../../UI/textfields/TextFieldForm/TextFieldForm";
import { validationSchema } from "./ExperimentFormValidator";

import scss from "./experimentForm.module.scss";
import Switch from "../../UI/Switch/Switch";

const initialValues: IExperimentFormValues = {
  display_name: "",
  dataset: "",
  regressor: "",
  classifier: "",
  logit: "",
  mixture: "",
  score_function: "",
  root_nodes: [] as string[],
  comparison: false,
};

const ExperimentForm: FC<{
  onSubmit: (values: IExperimentFormValues) => void;
}> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { username } = useUser();

  const { data: networks, isError: isErrorGetNetworks } =
    bn_managerAPI.useGetBNDataNamesQuery({
      owner: username,
    });
  const { data: datasets, isError: isErrorGetDatasets } =
    data_managerAPI.useGetDatasetsQuery({
      user: username,
    });
  const { data: regressor, isError: isErrorGetRegressor } =
    experimentAPI.useGetModelsQuery({
      model_type: "regressor",
    });
  const { data: classifier, isError: isErrorGetClassifier } =
    experimentAPI.useGetModelsQuery({
      model_type: "classifier",
    });

  const { values, touched, errors, handleSubmit, handleChange, setValues } =
    useFormik({
      initialValues,
      initialErrors: { logit: "" },
      validationSchema,
      onSubmit: (values) => {
        if (isDisplayNameRepeat || isNetworkLimit) return;
        onSubmit(values);
      },
    });

  const { data: rootNodes, isError: isErrorGetRootNodes } =
    data_managerAPI.useGetDatasetRootNodesQuery(
      {
        owner: username,
        name: values.dataset,
      },
      { skip: !values.dataset }
    );

  const isDisplayNameRepeat = useMemo(
    () => networks?.networks.includes(values.display_name),
    [networks?.networks, values.display_name]
  );

  const isNetworkLimit = useMemo(
    () => networks && networks.networks.length >= NETWORKS_LIMIT,
    [networks]
  );

  const handleStartEdges = useCallback(() => {
    dispatch(setNodes(createNodes(rootNodes?.root_nodes || [])));
    dispatch(setLinks([]));
  }, [dispatch, rootNodes]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, root_nodes: initialValues.root_nodes }));
  }, [setValues, values.dataset]);

  useEffect(() => {
    dispatch(cleanExperiment());
  }, [values.root_nodes, values.dataset, dispatch]);

  return (
    <form className={scss.root} onSubmit={handleSubmit}>
      <div className={scss.content}>
        <h2 className={scss.title}>Model Parameters</h2>
        <div>
          <TextFieldForm
            value={values.display_name}
            onChange={handleChange}
            name="display_name"
            label="Display_name"
            placeholder="Enter name ..."
            className={scss.displayName}
            error={
              isNetworkLimit ||
              isDisplayNameRepeat ||
              (touched.display_name && !!errors.display_name)
            }
            helperText={
              isNetworkLimit
                ? `Can't save more then ${NETWORKS_LIMIT} networks`
                : isDisplayNameRepeat
                ? VALIDATION_MESSAGES.unique("Network")
                : touched.display_name && errors.display_name
            }
          />
          <AppSelect
            options={Object.keys(datasets || {})}
            value={values.dataset}
            onChange={handleChange}
            name="dataset"
            label="Dataset"
            className={scss.parameter}
            error={touched.dataset && !!errors.dataset}
            helperText={touched.dataset && errors.dataset}
          />
          <AppSelect
            options={regressor?.models || []}
            value={values.regressor}
            onChange={handleChange}
            name="regressor"
            label="Regressor"
            className={scss.parameter}
            error={touched.regressor && !!errors.regressor}
            helperText={touched.regressor && errors.regressor}
            disabled
          />
          <AppSelect
            options={classifier?.models || []}
            value={values.classifier}
            onChange={handleChange}
            name="classifier"
            label="Classifier"
            className={scss.parameter}
            error={touched.classifier && !!errors.classifier}
            helperText={touched.classifier && errors.classifier}
          />
          <AppSelect
            options={["True", "False"]}
            value={values.logit}
            onChange={handleChange}
            name="logit"
            label="Logit"
            className={scss.parameter}
            error={touched.logit && !!errors.logit}
            helperText={touched.logit && errors.logit}
          />
          <AppSelect
            options={["True", "False"]}
            value={values.mixture}
            onChange={handleChange}
            name="mixture"
            label="Mixture"
            className={scss.parameter}
            error={touched.mixture && !!errors.mixture}
            helperText={touched.mixture && errors.mixture}
          />
          <AppSelect
            options={SCORE_FUNCTION_VALUES}
            value={values.score_function}
            onChange={handleChange}
            name="score_function"
            label="Score function"
            className={scss.parameter}
            error={touched.score_function && !!errors.score_function}
            helperText={touched.score_function && errors.score_function}
          />
          <AppMultiSelect
            className={scss.parameter}
            options={rootNodes?.root_nodes || []}
            value={values.root_nodes}
            onChange={handleChange}
            name="root_nodes"
            label="Root nodes"
            helperText="select node type"
          />
          <Switch
            checked={values.comparison}
            onChange={handleChange}
            className={scss.switch}
            name="comparison"
            label="Comparison with the classical algorithm"
            disabled
          />
        </div>
      </div>

      <AppButton
        onClick={handleStartEdges}
        disabled={!rootNodes || rootNodes.root_nodes.length < 1}
      >
        Start edges
      </AppButton>
      <AppButton type="submit" disabled={isNetworkLimit || isDisplayNameRepeat}>
        Train the model
      </AppButton>

      <AlertError
        isError={isErrorGetNetworks}
        message="Error on get networks"
      />
      <AlertError
        isError={isErrorGetDatasets}
        message="Error on get datasets"
      />
      <AlertError
        isError={isErrorGetRegressor}
        message="Error on get regressor model_type"
      />
      <AlertError
        isError={isErrorGetClassifier}
        message="Error on get classifier model_type"
      />
      <AlertError
        isError={isErrorGetRootNodes}
        message={`Error on get root nodes of ${values.dataset} dataset`}
      />
    </form>
  );
};

export default ExperimentForm;
