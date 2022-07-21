export interface IExperimentRootNodes {
  root_nodes: string[];
}

export interface IBNParams {
  scoring_function: string;
  use_mixture: boolean;
  has_logit: boolean;
  params: {
    init_nodes: string[];
    init_edges: [string, string][];
    remove_init_edges?: boolean;
  };
}

export interface INetwork extends IBNParams {
  name: string;
  descriptor: {
    Period: string;
    Netpay: string;
    Permeability: string;
    Lithology: string;
    Gross: string;
    "Structural setting": string;
    Porosity: string;
    "Tectonic regime": string;
    Depth: string;
  };
  nodes: string[];
  edges: [string, string][];
}

export interface IBNDataNames {
  networks: string[];
}

export interface IBNData {
  networks: { [key: string]: INetwork };
}

export interface ITrainBN {
  network: INetwork;
}
