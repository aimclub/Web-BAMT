import { useFormik } from "formik";
import { useState } from "react";

import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../redux/auth/auth";
import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import styles from "./signinForm.module.scss";
import { validationSchema } from "./signinFormValidator";

const SigninForm = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // TODO: add API
      console.log("log in", values);
      !authError ? setAuthError("Authorization error!") : dispatch(login());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.root}>
      <h1 className={styles.title}>Sign In</h1>
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

      <p className={styles.error}>{authError}</p>

      <SubmitSignin type="submit">
        <span>Sign In</span>
      </SubmitSignin>
    </form>
  );
};

export default SigninForm;
