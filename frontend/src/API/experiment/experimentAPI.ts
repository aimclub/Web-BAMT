import { formatBNParamsToString } from "../../assets/utils/format";

import { ITrainBN } from "../../types/experiment";
import { commonApi } from "../baseURL";
import {
  ExperimentModelType,
  IExperimentModels,
  IExperimentParameters,
} from "./experimentTypes";

const BASE_URL = "experiment/";

export const experimentAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getModels: build.query<
      IExperimentModels,
      { model_type: ExperimentModelType }
    >({
      query: ({ model_type }) => ({
        url: `${BASE_URL}get_models`,
        params: { model_type },
      }),
    }),

    // train, create network
    train: build.mutation<ITrainBN, IExperimentParameters>({
      query: ({ owner, name, dataset, bn_params }) => ({
        url: `${BASE_URL}${owner}/${name}/${dataset}/${formatBNParamsToString(
          bn_params
        )}`,
        method: "GET",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});
