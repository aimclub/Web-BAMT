import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";

const login = Yup.string()
  .min(2, VALIDATION_MESSAGES.min(2))
  .max(15, VALIDATION_MESSAGES.max(15))
  .required(VALIDATION_MESSAGES.required);

const password = Yup.string()
  //   .min(8, "Minimum 8 characters")
  .required(VALIDATION_MESSAGES.required);

export const validationSchema = Yup.object().shape({
  login,
  password,
});

export const validationSchemaTwoPassword = Yup.object().shape({
  login,
  password,
  confirm_password: password.when("password", {
    is: (password: string | unknown[]) =>
      password && password.length > 0 ? true : false,
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      VALIDATION_MESSAGES.repeat("Passwords")
    ),
  }),
});
