import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL, URLendpoints } from "../baseURL";
import { IBNData, IBNDataNames, ISample } from "../../types/experiment";

export const bn_managerAPI = createApi({
  reducerPath: "bn_managerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${URLendpoints.BN_MANAGER}`,
  }),
  tagTypes: ["Networks"],
  endpoints: (build) => ({
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
    getSampleData: build.query<
      ISample,
      { owner: string; name: string; node: string }
    >({
      query: ({ owner, name, node }) => ({
        url: `get_sample/${owner}/${name}/${node}`,
      }),
      providesTags: ["Networks"],
    }),
    removeBN: build.mutation<unknown, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `remove/${owner}/${name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});
