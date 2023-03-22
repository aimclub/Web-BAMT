import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { BASE_URL } from "../baseURL";
import { IToken, IUserAuth } from "./authTypes";

export const authAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/auth/` }),
  endpoints: (build) => ({
    signin: build.mutation<IToken, IUserAuth>({
      query: (data) => ({
        url: "get_token",
        method: "POST",
        body: {
          username: data.username,
          password: data.password,
        },
      }),
    }),
    checkToken: build.mutation<null, { token: string; username: string }>({
      query: (data) => ({
        url: "signin",
        method: "PUT",
        body: {
          username: data.username,
          token: data.token,
        },
      }),
    }),
    register: build.mutation<{ message: string }, IUserAuth>({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: {
          username: data.username,
          password: data.password,
        },
      }),
    }),
  }),
});
