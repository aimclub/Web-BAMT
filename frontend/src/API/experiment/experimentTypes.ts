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
  use_mixture: ExperimentBooleanValue;
  has_logit: ExperimentBooleanValue;
  classifier: string;
  regressor: string;
  compare_with_default: ExperimentBooleanValue;
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

type ExperimentBooleanValue = "" | "True" | "False";

export interface IExperimentFormValues {
  display_name: string;
  dataset: string;
  regressor: string;
  classifier: string;
  logit: ExperimentBooleanValue;
  mixture: ExperimentBooleanValue;
  score_function: string;
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
