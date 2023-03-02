import { useFormik } from "formik";
import { authAPI } from "../../../API/auth/authAPI";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import SignButton from "../../UI/buttons/sign/SignButton";
import scss from "./authForms.module.scss";
import { validationSchema } from "./authFormsValidator";

const SigninForm = () => {
  const [signin, { isError, isLoading }] = authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: { login: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      signin({ username: values.login, password: values.password });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={scss.root}>
      <h1 className={scss.title}>Sign In</h1>
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

      <p className={scss.error}>{isError && "Authorization error!"}</p>

      <SignButton type="submit" disabled={isLoading}>
        <span>{isLoading ? "Loading..." : "Sign In"}</span>
      </SignButton>
    </form>
  );
};

export default SigninForm;
