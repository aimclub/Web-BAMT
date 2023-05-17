import { FC, memo } from "react";
import { Graph, GraphConfiguration } from "react-d3-graph";
import { IGraph, ILink, INode } from "../../../../../types/graph";

const myConfig: (size: {
  height: number;
  width: number;
}) => Partial<GraphConfiguration<INode, ILink>> = ({ height, width }) => ({
  directed: true,
  height,
  linkHighlightBehavior: false,
  nodeHighlightBehavior: false,
  width,
  d3: {
    gravity: -400,
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
    markerHeight: 3,
    markerWidth: 3,
  },
  initialZoom: 0.6,
});

const SampleNetworkItemData: FC<{
  onNodeClick: (node: string) => void;
  data: IGraph;
  index: number;
  size?: {
    height?: number;
    width?: number;
  };
}> = ({
  onNodeClick,
  data,
  index,
  size: { height = 160, width = 290 } = {},
}) => {
  return (
    <Graph
      id={`graph-${index}`}
      config={myConfig({ height, width })}
      data={data}
      onClickNode={onNodeClick}
    />
  );
};

export default memo(SampleNetworkItemData);
