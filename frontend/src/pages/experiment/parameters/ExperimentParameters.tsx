import Fade from "@mui/material/Fade";
import { useMemo } from "react";

import { data_managerAPI } from "../../../API/data_manager/data_managerAPI";
import { experimentAPI } from "../../../API/experiment/experimentAPI";
import {
  SCORE_FUNCTION_VALUES,
  TRANSITION_TIMEOUT,
} from "../../../assets/utils/constants";
import AlertError from "../../../components/UI/alerts/error/AlertError";
import { IAppSelectOptions } from "../../../components/UI/selects/AppSelect/AppSelect";
import { ExperimentFormSelectorsType } from "../../../components/forms/experiment/ExperimentForm";
import { useUser } from "../../../hooks/useUser";
import ExperimentParametersTrain from "./train/ExperimentParametersTrain";

const ExperimentParameters = () => {
  const { username } = useUser();

  const { data: datasets, isError: isErrorGetDatasets } =
    data_managerAPI.useGetDatasetsQuery({
      user: username,
    });
  const { data: regressor, isError: isErrorGetRegressor } =
    experimentAPI.useGetModelsQuery({
      model_type: "regressor",
    });
  const { data: classifier, isError: isErrorGetClassifier } =
    experimentAPI.useGetModelsQuery({
      model_type: "classifier",
    });

  const options = useMemo<
    Record<ExperimentFormSelectorsType, IAppSelectOptions>
  >(
    () => ({
      dataset: Object.keys(datasets || {}),
      regressor: regressor?.models || [],
      classifier: classifier?.models || [],
      logit: ["True", "False"],
      mixture: ["True", "False"],
      score_function: SCORE_FUNCTION_VALUES,
    }),
    [classifier?.models, datasets, regressor?.models]
  );

  return (
    <Fade in={true} timeout={TRANSITION_TIMEOUT}>
      <section>
        <ExperimentParametersTrain options={options} />
        <AlertError
          isError={isErrorGetDatasets}
          message="Error on get datasets"
        />
        <AlertError
          isError={isErrorGetRegressor}
          message="Error on get regressor model_type"
        />
        <AlertError
          isError={isErrorGetClassifier}
          message="Error on get classifier model_type"
        />
      </section>
    </Fade>
  );
};

export default ExperimentParameters;
