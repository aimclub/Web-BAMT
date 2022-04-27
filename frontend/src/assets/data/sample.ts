import { ILink, INode } from "../../types/graph";

export const networks: string[] = [
  "Name_0001",
  "Name_0002",
  "Name_0003",
  "Name_0004",
];

export const graphs: {
  name: string;
  data: { nodes: INode[]; links: ILink[] };
}[] = [
  {
    name: "Name_0001",
    data: {
      nodes: [
        { id: "N1" },
        { id: "N2" },
        { id: "N3" },
        { id: "N4" },
        { id: "N5" },
        { id: "N6" },
        { id: "N7" },
        { id: "N8" },
        { id: "N9" },
        { id: "N10" },
      ],
      links: [
        { source: "N1", target: "N5" },
        { source: "N2", target: "N5" },
        { source: "N2", target: "N6" },
        { source: "N3", target: "N7" },
        { source: "N4", target: "N6" },
        { source: "N4", target: "N8" },
        { source: "N4", target: "N9" },
        { source: "N6", target: "N10" },
        { source: "N7", target: "N10" },
      ],
    },
  },
  {
    name: "Name_0002",
    data: {
      nodes: [
        { id: "N1" },
        { id: "N2" },
        { id: "N3" },
        { id: "N4" },
        { id: "N5" },
        { id: "N6" },
        { id: "N7" },
        { id: "N8" },
        { id: "N9" },
        { id: "N10" },
      ],
      links: [
        { source: "N1", target: "N2" },
        { source: "N2", target: "N5" },
        { source: "N2", target: "N6" },
        { source: "N3", target: "N7" },
        { source: "N4", target: "N3" },
        { source: "N4", target: "N7" },
        { source: "N6", target: "N3" },
        { source: "N7", target: "N10" },
        { source: "N9", target: "N4" },
      ],
    },
  },
  {
    name: "Name_0003",
    data: {
      nodes: [
        { id: "N1" },
        { id: "N2" },
        { id: "N3" },
        { id: "N4" },
        { id: "N5" },
        { id: "N6" },
        { id: "N7" },
        { id: "N8" },
        { id: "N9" },
        { id: "N10" },
      ],
      links: [
        { source: "N1", target: "N6" },
        { source: "N2", target: "N5" },
        { source: "N2", target: "N6" },
        { source: "N2", target: "N3" },
        { source: "N3", target: "N7" },
        { source: "N6", target: "N10" },
        { source: "N7", target: "N10" },
        { source: "N9", target: "N10" },
      ],
    },
  },
];

export const commonLinks: ILink[] = [
  { source: "N1", target: "N6" },
  { source: "N2", target: "N5" },
  { source: "N2", target: "N6" },
  { source: "N2", target: "N3" },
  { source: "N3", target: "N7" },
  { source: "N6", target: "N10" },
  { source: "N7", target: "N10" },
  { source: "N9", target: "N10" },
];

export const nodeRealData = [350, 100, 80, 40, 18, 25, 15, 15, 14, 12];

export const sampledRealData = [205, 100, 250, 40, 18, 160, 0, 15, 14, 40];
