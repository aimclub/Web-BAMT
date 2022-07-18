import { useCallback, useState } from "react";
import { bn_managerAPI } from "../API/bn_manager/bn_managerAPI";
import { experimentAPI } from "../API/experiment/experimentAPI";
import { IExperimentParameters } from "../components/forms/experiment/ExperimentForm";
import { setTraining } from "../redux/experiment/experiment";
import { IBNParams, ITrainBN } from "../types/experiment";
import { useAppDispatch, useAppSelector } from "./redux";
import { useCheckDisplayName } from "./useCheckDisplayName";

export const useTrainModel = (case_id: number) => {
  const { nodes, links } = useAppSelector((state) => state.experiment);
  const { user } = useAppSelector((state) => state.auth);

  const [successOpened, setSuccessOpened] = useState(false);
  const dispatch = useAppDispatch();

  const { isBNNamesError, errorPopup, onCloseMessagePopup, checkDisplayName } =
    useCheckDisplayName();
  const [trainModel, { isError: isTrainError }] =
    experimentAPI.useTrainMutation();
  const [assignBN, { isSuccess }] = bn_managerAPI.useAssignBNMutation();

  const handleTrainModel = useCallback(
    (values: IExperimentParameters) => {
      if (!checkDisplayName(values.display_name)) {
        dispatch(setTraining(true));

        const bn_params: IBNParams = {
          scoring_function: values.score_function,
          use_mixture: Boolean(values.mixture),
          has_logit: Boolean(values.logit),
          params: {
            init_nodes: nodes.map((n) => n.id),
            init_edges: links.map(({ source, target }) => [source, target]),
          },
        };
        // console.log("bn_params", bn_params);

        trainModel({ case_id, bn_params })
          .then((res) => {
            // console.log("res", res);
            if ((res as { data: ITrainBN }).data) {
              const network = (res as { data: ITrainBN }).data.network;
              return assignBN({
                ...bn_params,
                nodes: network.nodes,
                edges: network.edges,
                descriptor: network.descriptor,
                name: values.display_name,
                owner: user?.email || "undefined",
              }).then(() => setSuccessOpened(true));
            } else {
              setSuccessOpened(true);
            }
          })
          .finally(() => dispatch(setTraining(false)));
      }
    },
    [
      dispatch,
      nodes,
      links,
      case_id,
      user?.email,
      trainModel,
      assignBN,
      checkDisplayName,
    ]
  );

  const handleSuccessClose = useCallback(() => setSuccessOpened(false), []);

  return {
    handleTrainModel,
    isBNNamesError,
    errorPopup,
    onCloseMessagePopup,
    isSuccess,
    isTrainError,
    successOpened,
    handleSuccessClose,
  };
};
