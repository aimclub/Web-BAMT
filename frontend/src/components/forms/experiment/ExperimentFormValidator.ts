import * as Yup from "yup";
import { IExperimentFormValues } from "../../../API/experiment/experimentTypes";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";

const validationSchemaShape: Record<
  keyof IExperimentFormValues,
  Yup.AnySchema
> = {
  display_name: Yup.string().required(VALIDATION_MESSAGES.required),
  dataset: Yup.string().required(VALIDATION_MESSAGES.required),
  regressor: Yup.string(),
  classifier: Yup.string(),
  logit: Yup.string().required(VALIDATION_MESSAGES.required),
  mixture: Yup.string().required(VALIDATION_MESSAGES.required),
  score_function: Yup.string().required(VALIDATION_MESSAGES.required),
  root_nodes: Yup.array().of(Yup.string()),
  comparison: Yup.boolean(),
};

export const validationSchema = Yup.object().shape(validationSchemaShape);
