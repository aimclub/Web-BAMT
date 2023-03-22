/* eslint-disable @typescript-eslint/no-unused-vars */
import Fade from "@mui/material/Fade";

import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import { TRANSITION_TIMEOUT } from "../../../assets/utils/constants";
import ExperimentForm from "../../../components/forms/experiment/ExperimentForm";
import MessagePopup from "../../../components/popups/message/MessagePopup";
import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import { useCheckDisplayName } from "../../../hooks/useCheckDisplayName";
import { useTrainModel } from "../../../hooks/useTrainModel";

const ExperimentParameters = () => {
  const { user } = useAppSelector((state) => state.auth);

  // const { data: rootNodesData, isError: getRootNodesError } =
  //   experimentAPI.useGetRootNodesQuery({ case_id: 0 });
  const { isError: getBNNamesError } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.username || "",
  });

  const { checkDisplayName, displayNameError, clearDisplayNameError } =
    useCheckDisplayName();

  const { handleTrainModel, result, handleCloseResult, isSuccess } =
    useTrainModel({
      case_id: 0,
      checkDisplayName,
    });

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        {/* <ExperimentForm
          rootNodes={rootNodesData ? rootNodesData.root_nodes : []}
          onTrain={handleTrainModel}
        /> */}
        {/* <AlertError
          isError={getRootNodesError}
          message="Error on get root nodes"
        /> */}
        <AlertError
          isError={getBNNamesError}
          message="Error on get bn data names"
        />
        <MessagePopup
          message={displayNameError || ""}
          open={!!displayNameError}
          onClose={clearDisplayNameError}
        />
        <MessagePopup
          title={isSuccess ? "Success" : "Error"}
          isError={!isSuccess}
          message={result || ""}
          open={!!result}
          onClose={handleCloseResult}
        />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
