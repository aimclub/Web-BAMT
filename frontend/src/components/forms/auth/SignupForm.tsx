import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useFormik } from "formik";
import { useState } from "react";

import { authAPI } from "../../../API/auth/authAPI";
import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import scss from "./authForms.module.scss";
import { validationSchemaTwoPassword } from "./authFormsValidator";

const SignupForm = () => {
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const [signup, { isLoading, isError, error, isSuccess }] =
    authAPI.useRegisterMutation();

  const [login, { isLoading: isLoadingLogin, isError: isErrorLogin }] =
    authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchemaTwoPassword,
    onSubmit: (values) => {
      const passMatch = values.password === values.confirm_password;
      setPasswordMatch(passMatch);

      if (passMatch) {
        signup({ email: values.login, password: values.password }).then(
          (res) => {
            if ((res as { data: { message: string } })?.data) {
              login({ email: values.login, password: values.password });
            }
          }
        );
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={scss.root}>
      <h1 className={scss.title}>Sign Up</h1>
      <TextFieldSignin
        name="login"
        label="Login*"
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.login}
        helperText={formik.touched.password && formik.errors.login}
      />
      <TextFieldSignin
        name="password"
        label="Password*"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextFieldSignin
        name="confirm_password"
        label="Confirm password*"
        type="password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={
          formik.touched.confirm_password && !!formik.errors.confirm_password
        }
        helperText={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />

      <p className={scss.error}>
        {!passwordMatch
          ? "Passwords don`t match"
          : isError
          ? `Registration error! ${
              ((error as FetchBaseQueryError).data as { message: string })
                .message
            } `
          : isErrorLogin
          ? "Authorization error!"
          : isSuccess && "Registration sucess!!!"}
      </p>

      <SubmitSignin type="submit" disabled={isLoading || isLoadingLogin}>
        <span>{isLoading || isLoadingLogin ? "Loading..." : "Sign Up"}</span>
      </SubmitSignin>
    </form>
  );
};

export default SignupForm;
