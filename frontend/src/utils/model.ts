import { ModelType } from "../types/model";

export const SCORE_FUNCTION_VALUES = ["K2", "BIC", "MI", "BICGMM"];

const caseIds: { [key in ModelType]: number } = {
  geological: 0,
  social: 1,
};

export const getCaseId = (model: ModelType) => caseIds[model];
