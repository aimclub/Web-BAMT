import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGraph } from "../../types/graph";
import { ModelType } from "../../types/model";
import { getModelColor } from "../../utils/theme";

const initialState = {
  networks: ["", "", ""] as [string, string, string],
  graphs: [undefined, undefined, undefined] as [
    IGraph | undefined,
    IGraph | undefined,
    IGraph | undefined
  ],
  selectedNode: null as { id: string; index: number } | null,
};

export const modelSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    clearSample: () => initialState,
    setNetwork: (
      state,
      action: PayloadAction<{ network: string; index: number }>
    ) => {
      state.networks[action.payload.index] = action.payload.network;
    },
    setNetworkGraph: (
      state,
      action: PayloadAction<{ data: IGraph | undefined; index: number }>
    ) => {
      state.graphs[action.payload.index] = action.payload.data;
    },
    selectNetworkNode: (
      state,
      action: PayloadAction<{ id: string; index: number; model: ModelType }>
    ) => {
      const { id, index, model } = action.payload;

      if (state.selectedNode && state.selectedNode?.index !== index) {
        const ind = state.selectedNode.index;

        //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.graphs[ind]!.nodes = state.graphs[ind]!.nodes.map((n) => ({
          ...n,
          color: undefined,
          fontColor: undefined,
        }));
      }

      state.selectedNode = action.payload;
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.graphs[index]!.nodes = state.graphs[index]!.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              color: getModelColor(model),
              fontColor: getModelColor(model),
            }
          : { ...n, color: undefined, fontColor: undefined }
      );
    },
  },
});

export const { clearSample, setNetwork, setNetworkGraph, selectNetworkNode } =
  modelSlice.actions;
export default modelSlice.reducer;
