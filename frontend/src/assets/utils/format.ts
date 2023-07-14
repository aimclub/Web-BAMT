import { IExperimentBNParams } from "../../API/experiment/experimentTypes";

export const formatStringToCapitalize = (str: string | undefined) =>
  str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";

// const formatBoolean = (value: boolean): string => (value ? "True" : "False");

export const formatBNParamsToString = (bn_params: IExperimentBNParams) => {
  console.log(bn_params);
  return `{"scoring_function":"${bn_params.scoring_function}","use_mixture":"${
    bn_params.use_mixture
  }","has_logit":"${bn_params.has_logit}","classifier":"${
    bn_params.classifier
  }","regressor":"${bn_params.regressor}","compare_with_default":"${
    bn_params.compare_with_default
  }","params":{"init_nodes":${JSON.stringify(
    bn_params.params.init_nodes
  )},"init_edges":[${
    bn_params.params.init_edges.length > 0
      ? `(${bn_params.params.init_edges
          .map(([s, t]) => `%22${s}%22,%22${t}%22`)
          .join("),(")})`
      : ""
  }]}}`;
};
