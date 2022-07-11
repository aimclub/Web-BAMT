import { useFormik } from "formik";
import { useState } from "react";

import { useAppDispatch } from "../../../hooks/redux";
import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import { authAPI } from "../../../API/auth/authAPI";
import { validationSchemaTwoPassword } from "./authFormsValidator";
import scss from "./authForms.module.scss";

const SignupForm = () => {
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  // const dispatch = useAppDispatch();
  const [signup, { isLoading, isError }] = authAPI.useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchemaTwoPassword,
    onSubmit: (values) => {
      setPasswordMatch(values.password === values.confirm_password);
      // console.log("log up", values);
      if (values.password === values.confirm_password) {
        // console.log("helo");
        signup({ email: values.login, password: values.password }).then((res) =>
          console.log("res", res)
        );
        // TODO: add API
        // !authError ? setAuthError("Authorization error!") : dispatch(login());
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
          : isError && "Authorization error!"}
      </p>

      <SubmitSignin type="submit" disabled={isLoading}>
        <span>{isLoading ? "Loading..." : "Sign Up"}</span>
      </SubmitSignin>
    </form>
  );
};

export default SignupForm;
