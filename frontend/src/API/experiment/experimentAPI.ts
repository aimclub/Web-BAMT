import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { formatBNParamsToString } from "../../assets/utils/format";

import { BASE_URL, URLendpoints } from "../baseURL";
import {
  IBNParams,
  IExperimentRootNodes,
  ITrainBN,
} from "../../types/experiment";

export const experimentAPI = createApi({
  reducerPath: "experimentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${URLendpoints.EXPERIMENT}`,
  }),
  endpoints: (build) => ({
    getRootNodes: build.query<IExperimentRootNodes, { case_id: number }>({
      query: ({ case_id }) => ({
        url: `get_root_nodes/${case_id}`,
      }),
    }),
    train: build.mutation<
      ITrainBN,
      { owner: string; name: string; case_id: number; bn_params: IBNParams }
    >({
      query: ({ owner, name, case_id, bn_params }) => ({
        url: `${owner}/${name}/${case_id}/${formatBNParamsToString(bn_params)}`,
        method: "GET",
      }),
    }),
  }),
});
