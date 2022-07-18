import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { INetwork } from "../../types/experiment";
import { BASE_URL, URLendpoints } from "../baseURL";

export const exampleAPI = createApi({
  reducerPath: "exampleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/${URLendpoints.EXAMPLE}`,
  }),
  endpoints: (build) => ({
    getExample: build.query<INetwork, { case_id: number }>({
      query: ({ case_id }) => ({
        url: `get_example/${case_id}`,
      }),
    }),
  }),
});
