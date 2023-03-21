import { ModelType } from "../../types/model";

export const TRANSITION_TIMEOUT = 500;

export const SCORE_FUNCTION_VALUES = ["K2", "BIC", "MI" /* , "BICGMM" */];

export const APP_COLOR = "#86BD24";

export const CASES_IDS: { [key in ModelType]: number } = {
  geological: 0,
  social: 1,
};
