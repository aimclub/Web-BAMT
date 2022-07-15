import Fade from "@mui/material/Fade";
import { useCallback, useEffect, useState } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import { IBNParams, ITrainBN } from "../../../types/experiment";
import ExperimentForm, {
  IExperimentParameters,
} from "../../../components/forms/experiment/ExperimentForm";
import MessagePopup from "../../../components/popups/message/MessagePopup";
import AlertError from "../../../components/UI/alerts/error/AlertError";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setTraining } from "../../../redux/experiment/experiment";
import { TRANSITION_TIMEOUT } from "../../../utils/constants";
import { getCaseId } from "../../../utils/model";

const ExperimentParameters = () => {
  const [successOpened, setSuccessOpened] = useState(false);
  const { user } = useAppSelector((s) => s.auth);
  const { model } = useAppSelector((s) => s.model);
  const { nodes, links } = useAppSelector((s) => s.experiment);
  const dispatch = useAppDispatch();
  const case_id = getCaseId(model);

  const { data: rootNodesData, isError: isRootNodesError } =
    experimentAPI.useGetRootNodesQuery({
      case_id,
    });
  const [trainModel, { isError: isTrainError }] =
    experimentAPI.useTrainMutation();

  const [assignBN, { isSuccess }] = bn_managerAPI.useAssignBNMutation();

  const handleTrainModel = useCallback(
    (values: IExperimentParameters) => {
      // console.log("values", values);
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
            assignBN({
              ...bn_params,
              nodes: network.nodes,
              edges: network.edges,
              name: values.display_name,
              owner: user?.email || "undefined",
            });
          }
        })
        .finally(() => dispatch(setTraining(false)));
    },
    [dispatch, nodes, links, case_id, user?.email, trainModel, assignBN]
  );

  const handleSuccessClose = useCallback(() => setSuccessOpened(false), []);

  useEffect(() => {
    if (isSuccess) setSuccessOpened(true);
  }, [isSuccess]);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentForm
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
        <MessagePopup
          title="Success"
          message={"Model train and save."}
          open={successOpened}
          onClose={handleSuccessClose}
        />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
