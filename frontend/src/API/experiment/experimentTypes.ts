export type ExperimentModelType = "regressor" | "classifier";

export interface IExperimentModels {
  models: string[];
}

export interface IExperimentParameters {
  owner: string;
  name: string;
  dataset: string;
  bn_params: IExperimentBNParams;
}

export interface IExperimentBNParams {
  scoring_function: string;
  use_mixture: boolean;
  has_logit: boolean;
  classifier: string;
  regressor: string;
  params: {
    init_nodes: string[];
    init_edges: [string, string][];
    remove_init_edges?: boolean;
  };
}

export interface INetwork extends IExperimentBNParams {
  dataset_name: string;
  name: string;
  descriptor: Record<string, string>;
  nodes: string[];
  edges: [string, string][];
}

export interface IExperimentFormValues {
  display_name: string;
  dataset: string;
  regressor: "";
  classifier: "";
  logit: "";
  mixture: "";
  score_function: "";
  root_nodes: string[];
  comparison: boolean;
}

export interface ITrainBN {
  network: INetwork;
}

export interface INetworkNode {
  network_name: string;
  node_name: string;
  dataset_name: string;
}
