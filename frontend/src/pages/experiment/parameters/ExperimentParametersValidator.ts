import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  logit: Yup.string().required("Required!"),
  mixture: Yup.string().required("Required!"),
  score_function: Yup.string().required("Required!"),
  root_nodes: Yup.array().of(Yup.string()).min(1, "Min one item"),
});
