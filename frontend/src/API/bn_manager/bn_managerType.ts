import { INetwork } from "../experiment/experimentTypes";

export interface ISampleNetworkNode {
  owner: string;
  net_name: string;
  dataset_name: string;
  node: string;
}

export interface IBNData {
  networks: { [key: string]: INetwork };
}

export interface IBNDataNames {
  networks: string[];
}

export interface ISample {
  data: number[];
  xvals: number[];
  metrics: Record<string, number>; // { kl_divergence: number; survival?: number };
  type?: string; // "cont" |"disc"
}

export interface IEqualEdges {
  equal_edges: [string, string][];
}