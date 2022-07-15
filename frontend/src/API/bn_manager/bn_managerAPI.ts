import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, URLendpoints } from "../baseURL";
import { IBNData, IBNManagerModel } from "../experiment/experimentInterface";

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
    getBNData: build.mutation<IBNData, { owner: string }>({
      query: (data) => ({
        url: "get_BN",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
