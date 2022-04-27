import { ModelType } from "../types/model";

export enum AppRoutes {
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  RESTORE_PASSWORD = "/restore-password",
  HOME = "/",
  MODEL = "/:model",
  EXPERIMENT = "experiment",
  SAMPLE = "sample",
}

export const goToPage = {
  example: (model: ModelType) => `/${model}`,
  experiment: (model: ModelType) => `/${model}/${AppRoutes.EXPERIMENT}`,
};
