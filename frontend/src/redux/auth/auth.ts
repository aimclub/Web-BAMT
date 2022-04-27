import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    //TODO: create API
    login: (state) => {
      state.isAuth = true;
    },
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
