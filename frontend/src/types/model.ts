export type ModelType = "social" | "geological";
export type SimulationType = "example" | "experiment";

export interface IParameters {
  name?: string;
  description?: string;
  logit: boolean;
  mixture: boolean;
  score_function: string;
  root_nodes: string[];
}
