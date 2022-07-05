import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../API/auth/authInterface";

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
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
