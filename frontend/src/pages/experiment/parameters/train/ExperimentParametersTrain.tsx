import { FC, memo, useCallback, useEffect, useState } from "react";
import { experimentAPI } from "../../../../API/experiment/experimentAPI";
import { IExperimentFormValues } from "../../../../API/experiment/experimentTypes";
import { IAppSelectOptions } from "../../../../components/UI/selects/AppSelect/AppSelect";
import ExperimentForm, {
  ExperimentFormSelectorsType,
} from "../../../../components/forms/experiment/ExperimentForm";
import MessagePopup from "../../../../components/popups/message/MessagePopup";
import { useAppSelector } from "../../../../hooks/redux";
import { useUser } from "../../../../hooks/useUser";
import ExperimentLoader from "../../loader/ExperimentLoader";

const ExperimentParametersTrain: FC<{
  options: Record<ExperimentFormSelectorsType, IAppSelectOptions>;
}> = ({ options }) => {
  const { username } = useUser();
  const { links } = useAppSelector((state) => state.experiment);

  const [train, { isLoading, isError, isSuccess }] =
    experimentAPI.useTrainMutation();

  const [result, setResult] = useState<string | undefined>(undefined);

  const handleTrainModel = (values: IExperimentFormValues) => {
    // console.log("train model", values);

    train({
      owner: username,
      name: values.display_name,
      dataset: values.dataset,
      bn_params: {
        scoring_function: values.score_function,
        use_mixture: values.mixture,
        has_logit: values.logit,
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

  return (
    <>
      <ExperimentForm onSubmit={handleTrainModel} options={options} />

      <ExperimentLoader isTraining={isLoading} />

      <MessagePopup
        title={isSuccess ? "Success" : "Error"}
        isError={!isSuccess}
        message={result || ""}
        open={!!result}
        onClose={handleCloseResult}
      />
    </>
  );
};

export default memo(ExperimentParametersTrain);
