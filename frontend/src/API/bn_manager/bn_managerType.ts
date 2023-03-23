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
  xvals: string[];
  metrics: Record<string, string>; // { kl_divergence: number; survival?: number };
  type: string; // "cont" |"disc"
}
