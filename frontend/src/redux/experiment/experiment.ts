import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILink, INode } from "../../types/graph";

const initialState = {
  nodes: [] as INode[],
  links: [] as ILink[],
  sourceNodeId: null as string | null,
  isTraining: false,
};

export const experimentSlice = createSlice({
  name: "experiment",
  initialState,
  reducers: {
    cleanExperiment: () => initialState,
    setTraining: (state, action: PayloadAction<boolean>) => {
      state.isTraining = action.payload;
    },
    setNodes: (state, action: PayloadAction<INode[]>) => {
      state.nodes = action.payload;
    },
    setLinks: (state, action: PayloadAction<ILink[]>) => {
      state.links = action.payload;
    },
    setSourceNode: (state, action: PayloadAction<string | null>) => {
      state.sourceNodeId = action.payload;
    },
    recolourNode: (
      state,
      action: PayloadAction<{
        nodeId: string;
        color?: string;
        strokeColor?: string;
      }>
    ) => {
      const { nodeId, color, strokeColor } = action.payload;
      state.nodes = state.nodes.map((n) =>
        n.id === nodeId
          ? { ...n, color, strokeColor }
          : { ...n, color: undefined, strokeColor: undefined }
      );
    },
    addLink: (state, action: PayloadAction<ILink>) => {
      const { source, target } = action.payload;
      state.links = state.links
        // check dubles
        .filter(
          (link) =>
            (link.source !== source || link.target !== target) &&
            (link.target !== source || link.source !== target)
        )
        .concat(action.payload);
    },
    deleteLink: (state, action: PayloadAction<ILink>) => {
      state.links = state.links.filter(
        (link) =>
          link.source !== action.payload.source ||
          link.target !== action.payload.target
      );
    },
  },
});

export const {
  cleanExperiment,
  setTraining,
  setNodes,
  setLinks,
  setSourceNode,
  recolourNode,
  addLink,
  deleteLink,
} = experimentSlice.actions;
export default experimentSlice.reducer;
