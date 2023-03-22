import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../baseURL";
import { IDataSets } from "./data_managerTypes";

export const data_managerAPI = createApi({
  reducerPath: "data_managerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/data_manager`,
  }),
  tagTypes: ["Datasets"],
  endpoints: (build) => ({
    getDatasets: build.query<IDataSets, { user: string }>({
      query: ({ user }) => ({
        url: `get_datasets`,
        params: { user },
      }),
      providesTags: ["Datasets"],
    }),
    removeDataset: build.mutation<unknown, { owner: string; name: string }>({
      query: ({ owner, name }) => ({
        url: `remove_dataset`,
        method: "DELETE",
        params: { name, owner },
      }),
      invalidatesTags: ["Datasets"],
    }),
  }),
});
