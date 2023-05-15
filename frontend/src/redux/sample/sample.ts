import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INetwork, INetworkNode } from "../../API/experiment/experimentTypes";
import { bn_managerAPI } from "../../API/bn_manager/bn_managerAPI";

const initialState = {
  networks: Array(2).fill("") as (INetwork | "")[],
  equalNodes: [] as [string, string][],
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
      state.equalNodes = [];
    },
    selectNetworkNode: (state, action: PayloadAction<INetworkNode>) => {
      state.selectedNode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        bn_managerAPI.endpoints.getEqualEdges.matchFulfilled,
        (state, { payload }) => {
          state.equalNodes = payload.equal_edges;
        }
      )
      .addMatcher(
        bn_managerAPI.endpoints.getEqualEdges.matchRejected,
        (state) => {
          state.equalNodes = [];
        }
      );
  },
});

export const { clearSample, selectNetworkNode, setSelectedNetwork } =
  modelSlice.actions;
export default modelSlice.reducer;
