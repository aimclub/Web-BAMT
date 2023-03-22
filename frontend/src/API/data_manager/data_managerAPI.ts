import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../baseURL";
import { IDataSets, IUploadDataset } from "./data_managerTypes";

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
    uploadDataset: build.mutation<unknown, IUploadDataset>({
      query: ({ name, owner, description, file }) => {
        const body = new FormData();

        body.append("name", name);
        body.append("owner", owner);
        body.append("description", description);
        body.append("content", file);

        return {
          url: `upload`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Datasets"],
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
