import { useFormik } from "formik";

import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import scss from "./authForms.module.scss";

const RestorePasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirm_password: "",
    },
    // validationSchema: ,
    onSubmit: (values) => {
      console.log("restore password up", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={scss.root}>
      <h1 className={scss.title}>Restore password</h1>
      <TextFieldSignin
        name="login"
        label="Login*"
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.login}
        helperText={formik.touched.password && formik.errors.login}
        disabled
      />
      <TextFieldSignin
        name="password"
        label="Password*"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
        disabled
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
        disabled
      />

      <p className={scss.error}>{"Sorry: not available"}</p>

      <SubmitSignin type="submit" disabled>
        <span>Restore</span>
      </SubmitSignin>
    </form>
  );
};

export default RestorePasswordForm;
