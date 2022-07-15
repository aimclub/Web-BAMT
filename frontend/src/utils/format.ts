import { IBNParams } from "../API/experiment/experimentInterface";

export const formatStringToCapitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatValue = (value: any): string => {
  switch (typeof value) {
    case "boolean":
      return value ? "True" : "False";

    case "string":
      return `"${value}"`;

    case "object":
      if (Array.isArray(value)) {
        return `"[${value.map((item) => formatValue(item)).join(",")}]"`;
      } else {
        return formatObject(value);
      }

    default:
      return value;
  }
};

export const formatObject = (obj: object): string => {
  return `{${Object.entries(obj).map(([k, v]) => `"${k}":${formatValue(v)}`)}}`;
};

export const formatBNParamsToString = (bn_params: IBNParams) => {
  return `{"scoring_function":"${
    bn_params.scoring_function
  }","use_mixture":${formatValue(
    bn_params.use_mixture
  )},"has_logit":${formatValue(
    bn_params.has_logit
  )},"params":{"init_nodes":${JSON.stringify(
    bn_params.params.init_nodes
  )},"init_edges":[(${bn_params.params.init_edges
    .map(([s, t]) => `%22${s}%22,%22${t}%22`)
    .join("),(")})]}}`;
};
