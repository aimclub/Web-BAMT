import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL, URLendpoints } from "../baseURL";
import { IToken, IUserAuth } from "../../types/auth";

export const authAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    signin: build.mutation<IToken, IUserAuth>({
      query: (data) => ({
        url: URLendpoints.AUTH_LOGIN,
        method: "POST",
        body: {
          username: data.email,
          password: data.password,
        },
      }),
    }),
    checkToken: build.mutation<null, { token: string; email: string }>({
      query: (data) => ({
        url: URLendpoints.AUTH_LOGIN,
        method: "PUT",
        body: {
          username: data.email,
          token: data.token,
        },
      }),
    }),
    register: build.mutation<{ message: string }, IUserAuth>({
      query: (data) => ({
        url: URLendpoints.AUTH_REGISTER,
        method: "POST",
        body: {
          username: data.email,
          password: data.password,
        },
      }),
    }),
  }),
});
