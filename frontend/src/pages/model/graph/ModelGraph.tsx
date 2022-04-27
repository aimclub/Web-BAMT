import {
  Graph,
  GraphConfiguration,
  GraphNode,
  GraphLink,
} from "react-d3-graph";
import styles from "./modelGraph.module.scss";

import graphData from "../../../assets/data/graph.json";
import { colorizeGraph } from "../../../utils/graph";
import { useAppSelector } from "../../../hooks/redux";

const myConfig: Partial<GraphConfiguration<GraphNode, GraphLink>> = {
  directed: true,
  height: 500,
  linkHighlightBehavior: false,
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
    labelPosition: "center",
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
    strokeWidth: 2,
    markerHeight: 6,
    markerWidth: 6,
  },
};

const ModelGraph = () => {
  // console.log("render model graph");
  const { model } = useAppSelector((state) => state.model);

  return (
    <div className={styles.root}>
      <Graph
        id="graph-id"
        data={colorizeGraph(graphData, model)}
        config={myConfig}
      />
    </div>
  );
};

export default ModelGraph;
