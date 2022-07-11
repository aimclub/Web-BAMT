import { Fade } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import ModelButton from "../../../components/UI/buttons/ModelButton/ModelButton";
import AppMultiSelect from "../../../components/UI/selects/AppMultiSelect/AppMultiSelect";
import AppSelect from "../../../components/UI/selects/AppSelect/AppSelect";
import TextFieldUnderline from "../../../components/UI/textfields/TextFieldUnderline/TextFieldUnderline";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setLinks,
  setNodes,
  setTraining,
} from "../../../redux/experiment/experiment";
import { NODES, SCORE_FUNCTION_VALUES } from "../../../types/model";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import { createNodes } from "../../../utils/graph";
import scss from "./experimentParameters.module.scss";
import { validationSchema } from "./ExperimentParametersValidator";

const ExperimentParameters = () => {
  const [isTrainDisable, setTrainDasible] = useState<boolean>(true);
  const { model } = useAppSelector((s) => s.model);
  const { links, nodes } = useAppSelector((s) => s.experiment);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      display_name: "",
      logit: "",
      mixture: "",
      score_function: "",
      root_nodes: [],
    },
    initialErrors: { logit: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log("submit parameter", values);
      dispatch(setNodes(createNodes(values.root_nodes)));
      dispatch(setLinks([]));
    },
  });

  const handleTrainModel = () => {
    //TODO: train model
    console.log("train the model");
    dispatch(setTraining(true));
    setTimeout(() => {
      dispatch(setTraining(false));
    }, 5000);
  };

  useEffect(() => {
    const trainDisable =
      links.length <= 0 ||
      // every node has links
      nodes.some(
        (n) => !links.some((l) => l.source === n.id || l.target === n.id)
      );

    setTrainDasible(trainDisable);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section className={scss.root}>
        <form
          className={scss.form}
          onSubmit={formik.handleSubmit}
          id="model_parameters"
        >
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
              options={["true", "false"]}
              value={formik.values.logit}
              onChange={formik.handleChange}
              name="logit"
              label="Logit"
              helperText="select node type"
            />
            <AppSelect
              className={scss.item}
              options={["true", "false"]}
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
              options={NODES[model]}
              value={formik.values.root_nodes}
              onChange={formik.handleChange}
              name="root_nodes"
              label="Root nodes"
              helperText="select node type"
            />
          </div>
        </form>
        <ModelButton
          type="submit"
          form="model_parameters"
          disabled={!formik.isValid}
        >
          Start edges
        </ModelButton>
        <ModelButton disabled={isTrainDisable} onClick={handleTrainModel}>
          Train the model
        </ModelButton>
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
