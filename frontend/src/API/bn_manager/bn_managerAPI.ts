import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, URLendpoints } from "../baseURL";
import { IBNData, IBNManagerModel } from "../../types/experiment";

export const bn_managerAPI = createApi({
  reducerPath: "bn_managerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${URLendpoints.BN_MANAGER}`,
  }),
  endpoints: (build) => ({
    assignBN: build.mutation<null, IBNManagerModel>({
      query: (data) => ({
        url: "assign_BN",
        method: "PUT",
        body: data,
      }),
    }),
    getBNData: build.query<IBNData, { owner: string }>({
      query: ({ owner }) => ({
        url: `get_BN/${owner}`,
      }),
    }),
    removeBN: build.mutation<null, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `remove/${owner}/${name}`,
        method: "DELETE",
      }),
    }),
  }),
});
