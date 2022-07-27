import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  display_name: Yup.string().required("Required!"),
  logit: Yup.string().required("Required!"),
  mixture: Yup.string().required("Required!"),
  score_function: Yup.string().required("Required!"),
  root_nodes: Yup.array().of(Yup.string()),
});
