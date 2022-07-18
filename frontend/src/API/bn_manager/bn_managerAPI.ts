import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL, URLendpoints } from "../baseURL";
import { IBNData, IBNDataNames, IBNManagerModel } from "../../types/experiment";

export const bn_managerAPI = createApi({
  reducerPath: "bn_managerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${URLendpoints.BN_MANAGER}`,
  }),
  tagTypes: ["Networks"],
  endpoints: (build) => ({
    assignBN: build.mutation<null, IBNManagerModel>({
      query: (data) => ({
        url: "assign_BN",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Networks"],
    }),
    getBNData: build.query<IBNData, { owner: string }>({
      query: ({ owner }) => ({
        url: `get_BN/${owner}`,
      }),
      providesTags: ["Networks"],
    }),
    getBNDataNames: build.query<IBNDataNames, { owner: string }>({
      query: ({ owner }) => ({
        url: `get_BN_names/${owner}`,
      }),
      providesTags: ["Networks"],
    }),
    removeBN: build.mutation<null, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `remove/${owner}/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});
