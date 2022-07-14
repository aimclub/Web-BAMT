import { ModelType } from "../types/model";

const caseIds: { [key in ModelType]: number } = {
  geological: 0,
  social: 1,
};

export const getCaseId = (model: ModelType) => caseIds[model];
