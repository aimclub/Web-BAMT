import { IExperimentBNParams } from "../../API/experiment/experimentTypes";

export const formatStringToCapitalize = (str: string | undefined) =>
  str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";

const formatBoolean = (value: boolean): string => (value ? "True" : "False");

export const formatBNParamsToString = (bn_params: IExperimentBNParams) =>
  `{"scoring_function":"${
    bn_params.scoring_function
  }","use_mixture":${formatBoolean(
    bn_params.use_mixture
  )},"has_logit":${formatBoolean(bn_params.has_logit)},"classifier":"${
    bn_params.classifier
  }","params":{"init_nodes":${JSON.stringify(
    bn_params.params.init_nodes
  )},"init_edges":[${
    bn_params.params.init_edges.length > 0
      ? `(${bn_params.params.init_edges
          .map(([s, t]) => `%22${s}%22,%22${t}%22`)
          .join("),(")})`
      : ""
  }]}}`;
