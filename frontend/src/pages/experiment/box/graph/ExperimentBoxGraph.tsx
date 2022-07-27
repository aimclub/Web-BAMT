import { memo, useCallback, useMemo } from "react";
import {
  Graph,
  GraphConfiguration,
  GraphLink,
  GraphNode,
} from "react-d3-graph";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  addLink,
  deleteLink,
  recolourNode,
  setSourceNode,
} from "../../../../redux/experiment/experiment";
import { colorizeGraph } from "../../../../assets/utils/graph";
import { getModelColor } from "../../../../assets/utils/theme";

const myConfig: Partial<GraphConfiguration<GraphNode, GraphLink>> = {
  staticGraphWithDragAndDrop: true,
  directed: true,
  height: 500,
  linkHighlightBehavior: true,
  nodeHighlightBehavior: false,
  width: 980,
  d3: {
    gravity: -400,
  },
  node: {
    color: "transparent",
    fontColor: "#000000",
    fontSize: 16,
    fontWeight: "lighter",
    highlightFontSize: 16,
    highlightFontWeight: "lighter",
    labelPosition: "top",
    // labelProperty: "name",
    mouseCursor: "pointer",
    renderLabel: true,
    size: 2000,
    strokeColor: "rgba(0, 0, 0, 0.87)",
    strokeWidth: 2,
    symbolType: "circle",
  },
  link: {
    color: "#aaa",
    highlightColor: "#d32f2f", // to delete node
    mouseCursor: "auto",
    opacity: 1,
    renderLabel: false,
    strokeWidth: 4,
    markerHeight: 3,
    markerWidth: 3,
  },
};

const ExperimentBoxGraph = () => {
  const { model } = useAppSelector((state) => state.model);
  const dispatch = useAppDispatch();
  const { nodes, links, sourceNodeId } = useAppSelector(
    (state) => state.experiment
  );

  const handleAddLink = useCallback(
    (nodeId: string) => {
      if (sourceNodeId) {
        if (sourceNodeId === nodeId) {
          dispatch(recolourNode({ nodeId }));
          dispatch(setSourceNode(null));
        } else {
          dispatch(addLink({ source: sourceNodeId, target: nodeId }));
          dispatch(recolourNode({ nodeId: sourceNodeId }));
          dispatch(setSourceNode(null));
        }
      } else {
        dispatch(recolourNode({ nodeId, color: getModelColor(model) }));
        dispatch(setSourceNode(nodeId));
      }
    },
    [dispatch, model, sourceNodeId]
  );

  const handleDeleteLink = useCallback(
    (source: string, target: string) => {
      dispatch(deleteLink({ source, target }));
    },
    [dispatch]
  );

  const data = useMemo(
    () => colorizeGraph({ nodes, links }, model),
    [links, model, nodes]
  );

  return (
    <Graph
      id="graph-id"
      data={data}
      config={myConfig}
      onClickNode={handleAddLink}
      onClickLink={handleDeleteLink}
    />
  );
};

export default memo(ExperimentBoxGraph);
