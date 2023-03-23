import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INetwork, INetworkNode } from "../../API/experiment/experimentTypes";

const initialState = {
  networks: Array(2).fill("") as (INetwork | "")[],
  selectedNode: undefined as INetworkNode | undefined,
};

export const modelSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    clearSample: () => initialState,
    setSelectedNetwork: (
      state,
      action: PayloadAction<{ network: INetwork | ""; index: number }>
    ) => {
      state.networks[action.payload.index] = action.payload.network;
    },
    selectNetworkNode: (state, action: PayloadAction<INetworkNode>) => {
      state.selectedNode = action.payload;
    },
  },
});

export const { clearSample, selectNetworkNode, setSelectedNetwork } =
  modelSlice.actions;
export default modelSlice.reducer;
