import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material";
import { FC, useEffect } from "react";

import { Graph, GraphConfiguration } from "react-d3-graph";
import {
  networks,
  graphs as graphsData,
  commonLinks,
} from "../../../../assets/data/sample";
import AppSelect from "../../../../components/UI/selects/AppSelect/AppSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  selectNetworkNode,
  setNetwork,
  setNetworkGraph,
} from "../../../../redux/sample/sample";
import { ILink, INode } from "../../../../types/graph";
import { colorizeGraph, markCommonLinks } from "../../../../utils/graph";
import scss from "./sampleNetworkItem.module.scss";

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

interface I {
  index: number;
}

const SampleNetworkItem: FC<I> = ({ index }) => {
  const dispatch = useAppDispatch();
  const { networks: selectedNetworks } = useAppSelector(
    (state) => state.sample
  );

  const graph = useAppSelector((state) => state.sample.graphs[index]);
  const { model } = useAppSelector((state) => state.model);

  const handleNetworkChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setNetwork({ network: event.target.value as string, index }));
  };

  const handleNodeClick = (nodeId: string) => {
    dispatch(selectNetworkNode({ id: nodeId, index, model }));
  };

  useEffect(() => {
    const data = graphsData.find(
      (g) => g.name === selectedNetworks[index]
    )?.data;
    if (!selectedNetworks.some((n) => !n) && data) {
      dispatch(
        setNetworkGraph({ data: markCommonLinks(data, commonLinks), index })
      );
    } else {
      dispatch(setNetworkGraph({ data, index }));
    }
  }, [selectedNetworks, index, dispatch]);

  return (
    <article>
      <div className={scss.head}>
        <AppSelect
          className={scss.select}
          options={networks.map((name) => ({
            name,
            disabled: selectedNetworks.includes(name),
          }))}
          value={selectedNetworks[index]}
          helperText="select network"
          onChange={handleNetworkChange}
        />
        <div className={scss.score}>
          <StarIcon fontSize="small" />
          <span className={scss.title}>Score</span>
          <span className={scss.value}>200</span>
        </div>
      </div>
      <div className={scss.graph}>
        {graph ? (
          <Graph
            id={`graph-${index}`}
            config={myConfig}
            data={colorizeGraph(graph, model)}
            onClickNode={handleNodeClick}
          />
        ) : (
          <p className={scss.info}>choose networks</p>
        )}
      </div>
    </article>
  );
};

export default SampleNetworkItem;
