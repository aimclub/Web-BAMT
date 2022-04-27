import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModelType } from "../../types/model";

const initialState = {
  model: "social" as ModelType,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<ModelType>) => {
      state.model = action.payload;
    },
  },
});

export const { setModel } = modelSlice.actions;
export default modelSlice.reducer;
