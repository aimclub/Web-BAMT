import Fade from "@mui/material/Fade";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import ExperimentForm, {
  IExperimentParameters,
} from "../../../components/forms/experiment/ExperimentForm";
import AlertError from "../../../components/UI/alerts/error/AlertError";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setLinks,
  setNodes,
  setTraining,
} from "../../../redux/experiment/experiment";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import { createNodes } from "../../../utils/graph";
import { getCaseId } from "../../../utils/model";

const ExperimentParameters = () => {
  const { model } = useAppSelector((s) => s.model);
  const dispatch = useAppDispatch();

  const { data: rootNodesData, isError } = experimentAPI.useGetRootNodesQuery({
    case_id: getCaseId(model),
  });

  const handleSubmit = (values: IExperimentParameters) => {
    console.log("submit parameter", values);
    dispatch(setNodes(createNodes(values.root_nodes)));
    dispatch(setLinks([]));
  };

  const handleTrainModel = () => {
    //TODO: train model
    console.log("train the model");
    dispatch(setTraining(true));
    setTimeout(() => {
      dispatch(setTraining(false));
    }, 5000);
  };

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentForm
          onSubmit={handleSubmit}
          rootNodes={rootNodesData ? rootNodesData.root_nodes : []}
          onTrain={handleTrainModel}
        />
        <AlertError isError={isError} />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
