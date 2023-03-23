import { INetwork } from "../../API/experiment/experimentTypes";
import { IGraph, ILink } from "../../types/graph";
import { APP_COLOR } from "./constants";

export const formatNetwork = (data: INetwork): IGraph => ({
  nodes: data.nodes.map((name) => ({ id: name })),
  links: data.edges.map(([source, target]) => ({ source, target })),
});

export const colorizeNetwork = (
  network: INetwork,
  activeNode?: { network_name: string; node_name: string }
): IGraph => {
  return {
    nodes: network.nodes.map((name) => {
      const nodeProps: { [key in "color" | "fontColor"]: undefined | string } =
        {
          color: undefined,
          fontColor: undefined,
        };
      if (
        activeNode?.network_name === network.name &&
        activeNode.node_name === name
      ) {
        nodeProps.color = APP_COLOR;
        nodeProps.fontColor = APP_COLOR;
      }

      return { id: name, ...nodeProps };
    }),
    links: network.edges.map(([source, target]) => ({ source, target })),
  };
};

export const colorizeGraph = ({ nodes, links }: IGraph) => ({
  nodes,
  links: links.map((link) => ({
    ...link,
    color: link.isHightLight ? APP_COLOR : "#000000",
  })),
});

export const markCommonLinks = (
  { nodes, links }: IGraph,
  common: ILink[]
): IGraph => {
  return {
    nodes,
    links: links.map((link) => ({
      ...link,
      isHightLight: common.some(
        (l) => l.source === link.source && l.target === link.target
      ),
    })),
  };
};

const STEP_X = 100;
const STEP_Y = 150;
const WIDTH = 980 - 2 * STEP_X;
// const HEiGHT = 500;

export const createNodes = (arr: string[]) =>
  arr.map((node, index) => ({
    id: node,
    name: `${index + 1} ${node}`,
    x: STEP_X + ((STEP_X * index) % WIDTH),
    y: STEP_Y * Math.floor((STEP_X * index) / WIDTH + 1),
  }));
