import { IBNParams } from "../API/experiment/experimentInterface";
import { ModelType } from "../types/model";

export const SCORE_FUNCTION_VALUES = ["K2", "BIC", "MI", "BICGMM"];

const caseIds: { [key in ModelType]: number } = {
  geological: 0,
  social: 1,
};

export const getCaseId = (model: ModelType) => caseIds[model];

const formatBoolean = (v: boolean) => (v ? "True" : "False");

export const formatBNParamsToString = (bn_params: IBNParams) => {
  return `{"scoring_function":"${
    bn_params.scoring_function
  }","use_mixture":${formatBoolean(
    bn_params.use_mixture
  )},"has_logit":${formatBoolean(
    bn_params.has_logit
  )},"params":{"init_nodes":${JSON.stringify(
    bn_params.params.init_nodes
  )},"init_edges":[(${bn_params.params.init_edges
    .map(([s, t]) => `%22${s}%22,%22${t}%22`)
    .join("),(")})]}}`;
};
