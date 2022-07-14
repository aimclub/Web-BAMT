export interface IExperimentRootNodes {
  root_nodes: string[];
}

export interface ITrainBN {
  network: { nodes: string[]; edges: [string, string][] };
  // "sample": List[Dict]}}
}

export interface IBNParams {
  scoring_function: string;
  use_mixture: boolean;
  has_logit: boolean;
  params: {
    init_nodes: string[];
    // bl_add: string; // don't touch yet
    init_edges: [string, string][];
    remove_init_edges: boolean;
    // white_list: string; // don't touch yet
  };
}
