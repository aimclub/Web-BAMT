import Fade from "@mui/material/Fade";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import ExperimentForm from "../../../components/forms/experiment/ExperimentForm";
import MessagePopup from "../../../components/popups/message/MessagePopup";
import AlertError from "../../../components/UI/alerts/error/AlertError";

import { useAppSelector } from "../../../hooks/redux";
import { useTrainModel } from "../../../hooks/useTrainModel";
import { CASES_IDS, TRANSITION_TIMEOUT } from "../../../utils/constants";

const ExperimentParameters = () => {
  const { model } = useAppSelector((s) => s.model);
  const case_id = CASES_IDS[model];

  const { data: rootNodesData, isError: isRootNodesError } =
    experimentAPI.useGetRootNodesQuery({
      case_id,
    });

  const {
    handleTrainModel,
    isBNNamesError,
    errorPopup,
    onCloseMessagePopup,
    isSuccess,
    isTrainError,
    successOpened,
    handleSuccessClose,
  } = useTrainModel(case_id);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentForm
          rootNodes={rootNodesData ? rootNodesData.root_nodes : []}
          onTrain={handleTrainModel}
        />
        <AlertError
          isError={isRootNodesError}
          message="Error on get root nodes"
        />
        <AlertError
          isError={isBNNamesError}
          message="Error on get bn data names"
        />
        <MessagePopup
          message={errorPopup || ""}
          open={!!errorPopup}
          onClose={onCloseMessagePopup}
        />
        <MessagePopup
          title={isSuccess ? "Success" : "Error"}
          isError={!isSuccess}
          message={
            isSuccess
              ? "Model train and save."
              : isTrainError
              ? "Error on train model"
              : "Error on save model"
          }
          open={successOpened}
          onClose={handleSuccessClose}
        />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
