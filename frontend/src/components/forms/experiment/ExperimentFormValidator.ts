import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";

export const validationSchema = Yup.object().shape({
  display_name: Yup.string().required(VALIDATION_MESSAGES.required),
  dataset: Yup.string().required(VALIDATION_MESSAGES.required),
  // regressor: Yup.string().required(VALIDATION_MESSAGES.required),
  classifier: Yup.string(),
  logit: Yup.string().required(VALIDATION_MESSAGES.required),
  mixture: Yup.string().required(VALIDATION_MESSAGES.required),
  score_function: Yup.string().required(VALIDATION_MESSAGES.required),
  // root_nodes: Yup.array().of(Yup.string()),
});
