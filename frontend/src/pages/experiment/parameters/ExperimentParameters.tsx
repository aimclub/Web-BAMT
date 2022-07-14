import Fade from "@mui/material/Fade";
import { useCallback, useEffect } from "react";
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
  const { nodes, links } = useAppSelector((s) => s.experiment);
  const dispatch = useAppDispatch();
  const case_id = getCaseId(model);

  const { data: rootNodesData, isError: isRootNodesError } =
    experimentAPI.useGetRootNodesQuery({
      case_id,
    });
  const [trainModel, { data, isSuccess, isError: isTrainError }] =
    experimentAPI.useTrainMutation();

  const handleSubmit = useCallback(
    (values: IExperimentParameters) => {
      console.log("submit parameter", values);
      dispatch(setNodes(createNodes(values.root_nodes)));
      dispatch(setLinks([]));
    },
    [dispatch]
  );

  const handleTrainModel = useCallback(
    (values: IExperimentParameters) => {
      dispatch(setTraining(true));

      trainModel({
        case_id,
        bn_params: {
          scoring_function: values.score_function,
          use_mixture: Boolean(values.mixture),
          has_logit: Boolean(values.logit),
          params: {
            init_nodes: nodes.map((n) => n.id),
            init_edges: links.map(
              ({ source, target }) => [source, target] as [string, string]
            ),
            remove_init_edges: false,
          },
        },
      }).then((res) => {
        dispatch(setTraining(false));
        console.log(res);
      });
    },
    [case_id, dispatch, links, nodes, trainModel]
  );

  useEffect(() => {
    if (isSuccess) console.log("data", data);
  }, [isSuccess, data]);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentForm
          onSubmit={handleSubmit}
          rootNodes={rootNodesData ? rootNodesData.root_nodes : []}
          onTrain={handleTrainModel}
        />
        <AlertError
          isError={isRootNodesError || isTrainError}
          message={
            isRootNodesError
              ? "Error on get root nodes"
              : "Error on train model"
          }
        />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
