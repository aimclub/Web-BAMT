import Fade from "@mui/material/Fade";
import { useCallback, useEffect, useState } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";

import { experimentAPI } from "../../../API/experiment/experimentAPI";
import { IExperimentFormValues } from "../../../API/experiment/experimentTypes";
import { TRANSITION_TIMEOUT } from "../../../assets/utils/constants";
import ExperimentForm from "../../../components/forms/experiment/ExperimentForm";
import MessagePopup from "../../../components/popups/message/MessagePopup";
import { useAppSelector } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import ExperimentLoader from "../loader/ExperimentLoader";

const ExperimentParameters = () => {
  const { username } = useUser();
  const { links } = useAppSelector((state) => state.experiment);

  const { refetch } = bn_managerAPI.useGetBNDataNamesQuery({ owner: username });

  const [train, { isLoading, isError, isSuccess }] =
    experimentAPI.useTrainMutation();

  const [result, setResult] = useState<string | undefined>(undefined);

  const handleTrainModel = (values: IExperimentFormValues) => {
    console.log("train model", values);

    train({
      owner: username,
      name: values.display_name,
      dataset: values.dataset,
      bn_params: {
        scoring_function: values.score_function,
        use_mixture: Boolean(values.mixture),
        has_logit: Boolean(values.logit),
        classifier: values.classifier,
        regressor: values.regressor,
        params: {
          init_nodes: values.root_nodes,
          init_edges: links.map(({ source, target }) => [source, target]),
        },
      },
    });
  };

  const handleCloseResult = useCallback(() => setResult(undefined), []);

  useEffect(() => {
    if (isError) setResult("Error on train model.");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) setResult("Model train and save.");
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [isSuccess, isError, refetch]);

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentForm onSubmit={handleTrainModel} />

        <ExperimentLoader isTraining={isLoading} />

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
