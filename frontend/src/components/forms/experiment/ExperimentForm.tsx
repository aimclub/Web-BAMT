import scss from "./experimentForm.module.scss";

import { useFormik } from "formik";
import { FC, memo, useCallback, useEffect, useMemo } from "react";

import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import { data_managerAPI } from "../../../API/data_manager/data_managerAPI";
import { IExperimentFormValues } from "../../../API/experiment/experimentTypes";
import {
  NETWORKS_LIMIT,
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
import Switch from "../../UI/Switch/Switch";
import AlertError from "../../UI/alerts/error/AlertError";
import AppButton from "../../UI/buttons/app/AppButton";
import AppMultiSelect from "../../UI/selects/AppMultiSelect/AppMultiSelect";
import AppSelect, {
  IAppSelectOptions,
} from "../../UI/selects/AppSelect/AppSelect";
import TextFieldForm from "../../UI/textfields/TextFieldForm/TextFieldForm";
import { info, initialValues, validationSchema } from "./experimentFormUtils";

export type ExperimentFormSelectorsType =
  | "dataset"
  | "regressor"
  | "classifier"
  | "logit"
  | "mixture"
  | "score_function";

const SELECTORS: { name: ExperimentFormSelectorsType; label: string }[] = [
  { name: "dataset", label: "Dataset" },
  { name: "regressor", label: "Regressor" },
  { name: "classifier", label: "Classifier" },
  { name: "logit", label: "Logit" },
  { name: "mixture", label: "Mixture" },
  { name: "score_function", label: "Score function" },
];

const ExperimentForm: FC<{
  onSubmit: (values: IExperimentFormValues) => void;
  options: Record<ExperimentFormSelectorsType, IAppSelectOptions>;
}> = ({ onSubmit, options }) => {
  const dispatch = useAppDispatch();
  const { username } = useUser();

  const { data: networks, isError: isErrorGetNetworks } =
    bn_managerAPI.useGetBNDataNamesQuery({
      owner: username,
    });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    setValues,
    setFieldValue,
  } = useFormik<IExperimentFormValues>({
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

  const isClassifierDisabled = useMemo<boolean>(() => {
    if (values.logit !== "True") {
      setFieldValue("classifier", "");
      return true;
    }
    return false;
  }, [setFieldValue, values.logit]);

  const isRegressorDisabled = useMemo<boolean>(() => {
    if (values.mixture === "True") {
      setFieldValue("regressor", "");
      return true;
    }
    return false;
  }, [setFieldValue, values.mixture]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, root_nodes: initialValues.root_nodes }));
  }, [setValues, values.dataset]);

  useEffect(() => {
    dispatch(cleanExperiment());
  }, [values.dataset, dispatch]);

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
          {SELECTORS.map(({ name, label }) => (
            <AppSelect
              key={name}
              className={scss.parameter}
              options={options[name]}
              value={values[name]}
              onChange={handleChange}
              name={name}
              label={label}
              error={touched[name] && !!errors[name]}
              helperText={touched[name] && errors[name]}
              infoText={info[name]}
              disabled={
                (name === "classifier" && isClassifierDisabled) ||
                (name === "regressor" && isRegressorDisabled) ||
                false
              }
            />
          ))}
          <AppMultiSelect
            className={scss.parameter}
            options={rootNodes?.root_nodes || []}
            value={values.root_nodes}
            onChange={handleChange}
            name="root_nodes"
            label="Root nodes"
            helperText="select node type"
            disabled={!rootNodes}
          />
          <Switch
            checked={values.comparison}
            onChange={handleChange}
            className={scss.switch}
            name="comparison"
            label="Comparison with the classical algorithm"
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
        isError={isErrorGetRootNodes}
        message={`Error on get root nodes of ${values.dataset} dataset`}
      />
    </form>
  );
};

export default memo(ExperimentForm);
