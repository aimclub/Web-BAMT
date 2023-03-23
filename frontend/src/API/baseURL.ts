import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const commonApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
  }),
  tagTypes: ["Networks"],
  endpoints: () => ({}),
});
