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
