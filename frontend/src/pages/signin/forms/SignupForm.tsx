import { useFormik } from "formik";
import { useState } from "react";

import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../redux/auth/auth";
import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import styles from "./signinForm.module.scss";
import { validationSchemaTwoPassword } from "./signinFormValidator";

const SignupForm = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchemaTwoPassword,
    onSubmit: (values) => {
      console.log("log up", values);
      if (values.password !== values.confirm_password) {
        setAuthError("Passwords don`t match");
      } else {
        // TODO: add API
        !authError ? setAuthError("Authorization error!") : dispatch(login());
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.root}>
      <h1 className={styles.title}>Sign Up</h1>
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

      <p className={styles.error}>{authError}</p>

      <SubmitSignin type="submit">
        <span>Sign Up</span>
      </SubmitSignin>
    </form>
  );
};

export default SignupForm;
