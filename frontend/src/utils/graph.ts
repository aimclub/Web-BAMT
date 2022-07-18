import { INetwork } from "../types/experiment";
import { IGraph, ILink } from "../types/graph";
import { ModelType } from "../types/model";

export const formatNetwork = (data: INetwork): IGraph => ({
  nodes: data.nodes.map((name) => ({ id: name })),
  links: data.edges.map(([source, target]) => ({ source, target })),
});
export const colorizeGraph = ({ nodes, links }: IGraph, model?: ModelType) => {
  const color =
    model === "social"
      ? "#0074A2"
      : model === "geological"
      ? "#86BD24"
      : "#ff0000";

  return {
    nodes,
    links: links.map((link) => ({
      ...link,
      color: link.isHightLight ? color : "#000000",
    })),
  };
};

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
