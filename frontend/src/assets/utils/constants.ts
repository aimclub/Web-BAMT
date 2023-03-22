export const TRANSITION_TIMEOUT = 500;

export const SCORE_FUNCTION_VALUES = ["K2", "BIC", "MI" /* , "BICGMM" */];

export const APP_COLOR = "#86BD24";

export const NETWORKS_LIMIT = 7;

export const VALIDATION_MESSAGES = {
  required: "Required!",
  min: (num: number) => `Mininum ${num} characters!`,
  max: (num: number) => `Maximum ${num} characters!`,
  repeat: (fields: string) => `${fields} must match!`,
  unique: (field: string) => `${field} already exists!`,
};
