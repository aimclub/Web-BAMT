import { useCallback, useEffect, useState } from "react";
import { bn_managerAPI } from "../API/bn_manager/bn_managerAPI";
import { experimentAPI } from "../API/experiment/experimentAPI";
import { IExperimentParameters } from "../components/forms/experiment/ExperimentForm";
import { setTraining } from "../redux/experiment/experiment";
import { useAppDispatch, useAppSelector } from "./redux";

export const useTrainModel = ({
  case_id,
  checkDisplayName,
}: {
  case_id: number;
  checkDisplayName: (name: string) => boolean;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { nodes, links } = useAppSelector((state) => state.experiment);
  const [result, setResult] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const [trainModel, { isError, isSuccess }] = experimentAPI.useTrainMutation();
  const { refetch } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.email || "",
  });

  const handleTrainModel = useCallback(
    (values: IExperimentParameters) => {
      if (!checkDisplayName(values.display_name)) {
        dispatch(setTraining(true));

        trainModel({
          owner: user?.email || "",
          name: values.display_name,
          case_id,
          bn_params: {
            scoring_function: values.score_function,
            use_mixture: Boolean(values.mixture),
            has_logit: Boolean(values.logit),
            params: {
              init_nodes: nodes.map((n) => n.id),
              init_edges: links.map(({ source, target }) => [source, target]),
            },
          },
        }).finally(() => {
          refetch();
          dispatch(setTraining(false));
        });
      }
    },
    [
      case_id,
      checkDisplayName,
      dispatch,
      links,
      nodes,
      refetch,
      trainModel,
      user?.email,
    ]
  );

  const handleCloseResult = useCallback(() => setResult(undefined), []);

  useEffect(() => {
    if (isError) setResult("Error on train model.");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) setResult("Model train and save.");
  }, [isSuccess]);

  return { handleTrainModel, result, handleCloseResult, isSuccess };
};
