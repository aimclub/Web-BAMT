import { FC } from "react";
import { Graph, GraphConfiguration } from "react-d3-graph";
import { IGraph, ILink, INode } from "../../../../../types/graph";

const myConfig: Partial<GraphConfiguration<INode, ILink>> = {
  directed: true,
  height: 160,
  linkHighlightBehavior: false,
  nodeHighlightBehavior: false,
  width: 290,
  d3: {
    gravity: -200,
  },
  node: {
    color: "transparent",
    fontColor: "#000000",
    fontSize: 24,
    fontWeight: "lighter",
    labelPosition: "left",
    mouseCursor: "pointer",
    renderLabel: true,
    size: 2000,
    strokeColor: "rgba(0, 0, 0, 0.87)",
    strokeWidth: 2,
    symbolType: "circle",
  },
  link: {
    color: "#aaa",
    mouseCursor: "auto",
    opacity: 1,
    renderLabel: false,
    strokeWidth: 4,
    markerHeight: 4,
    markerWidth: 4,
  },
  initialZoom: 0.4,
};

const SampleNetworkItemData: FC<{
  onNodeClick: (node: string) => void;
  data: IGraph;
  index: number;
}> = ({ onNodeClick, data, index }) => {
  return (
    <Graph
      id={`graph-${index}`}
      config={myConfig}
      data={data}
      onClickNode={onNodeClick}
    />
  );
};

export default SampleNetworkItemData;
