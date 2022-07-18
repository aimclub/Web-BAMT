import {
  Graph,
  GraphConfiguration,
  GraphNode,
  GraphLink,
} from "react-d3-graph";
import scss from "./modelGraph.module.scss";

import { colorizeGraph, formatNetwork } from "../../../utils/graph";
import { useAppSelector } from "../../../hooks/redux";
import { memo } from "react";
import { exampleAPI } from "../../../API/example/exampleAPI";
import { CASES_IDS } from "../../../utils/constants";
import AlertError from "../../../components/UI/alerts/error/AlertError";

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
    labelPosition: "top",
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
  const case_id = CASES_IDS[model];
  const { data, isError } = exampleAPI.useGetExampleQuery({ case_id });

  return (
    <>
      <div className={scss.root}>
        {data && (
          <Graph
            id="graph-id"
            data={colorizeGraph(formatNetwork(data), model)}
            config={myConfig}
          />
        )}
      </div>
      <AlertError isError={isError} message={"Error on get example data"} />
    </>
  );
};

export default memo(ModelGraph);
