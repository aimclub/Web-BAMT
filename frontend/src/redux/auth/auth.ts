import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../API/auth/authAPI";
import { IUser } from "../../types/auth";

const initialState = {
  isAuth: false,
  user: null as IUser | null,
  token: null as string | null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = { email: action.payload.email };
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authAPI.endpoints.signin.matchFulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = { email: action.meta.arg.originalArgs.email };
      })
      .addMatcher(authAPI.endpoints.checkToken.matchRejected, (state) => {
        state.isAuth = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
