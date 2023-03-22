import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { formatBNParamsToString } from "../../assets/utils/format";

import { BASE_URL } from "../baseURL";
import { ITrainBN } from "../../types/experiment";
import {
  ExperimentModelType,
  IExperimentModels,
  IExperimentParameters,
} from "./experimentTypes";

export const experimentAPI = createApi({
  reducerPath: "experimentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/experiment`,
  }),
  endpoints: (build) => ({
    getModels: build.query<
      IExperimentModels,
      { model_type: ExperimentModelType }
    >({
      query: ({ model_type }) => ({
        url: `get_models`,
        params: { model_type },
      }),
    }),
    train: build.mutation<ITrainBN, IExperimentParameters>({
      query: ({ owner, name, dataset, bn_params }) => ({
        url: `${owner}/${name}/${dataset}/${formatBNParamsToString(bn_params)}`,
        method: "GET",
      }),
    }),
  }),
});
