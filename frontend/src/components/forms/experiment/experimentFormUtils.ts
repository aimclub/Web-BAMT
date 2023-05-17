import * as Yup from "yup";
import { IExperimentFormValues } from "../../../API/experiment/experimentTypes";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";

export const validationSchema = Yup.object().shape<
  Record<keyof IExperimentFormValues, Yup.AnySchema>
>({
  display_name: Yup.string().required(VALIDATION_MESSAGES.required),
  dataset: Yup.string().required(VALIDATION_MESSAGES.required),
  regressor: Yup.string(),
  classifier: Yup.string(),
  logit: Yup.string().required(VALIDATION_MESSAGES.required),
  mixture: Yup.string().required(VALIDATION_MESSAGES.required),
  score_function: Yup.string().required(VALIDATION_MESSAGES.required),
  root_nodes: Yup.array().of(Yup.string()),
  comparison: Yup.boolean(),
});

export const initialValues: IExperimentFormValues = {
  display_name: "",
  dataset: "",
  regressor: "",
  classifier: "",
  logit: "",
  mixture: "",
  score_function: "",
  root_nodes: [] as string[],
  comparison: false,
};

const INFO_TEXT =
  "Choosing these options will improve your quality, but may increase your training time.";

export const info: Partial<
  Record<keyof IExperimentFormValues | "other", string>
> = {
  dataset: "The more features in your data, the longer it will take to train",
  regressor: INFO_TEXT,
  classifier: INFO_TEXT,
  logit: INFO_TEXT,
  mixture: INFO_TEXT,
};
