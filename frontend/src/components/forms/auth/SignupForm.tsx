import scss from "./authForms.module.scss";

import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useFormik } from "formik";
import { useEffect } from "react";

import { authAPI } from "../../../API/auth/authAPI";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import SignButton from "../../UI/buttons/sign/SignButton";
import { validationSchemaTwoPassword } from "./authFormsValidator";

const SignupForm = () => {
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
      signup({ username: values.login, password: values.password });
    },
  });

  useEffect(() => {
    if (isSuccess)
      login({
        username: formik.values.login,
        password: formik.values.password,
      });
  }, [formik.values.login, formik.values.password, isSuccess, login]);

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
        {isError
          ? `Registration error! ${
              ((error as FetchBaseQueryError).data as { message: string })
                .message
            } `
          : isErrorLogin
          ? "Authorization error!"
          : isSuccess && "Registration sucess!!!"}
      </p>

      <SignButton type="submit" disabled={isLoading || isLoadingLogin}>
        <span>{isLoading || isLoadingLogin ? "Loading..." : "Sign Up"}</span>
      </SignButton>
    </form>
  );
};

export default SignupForm;
