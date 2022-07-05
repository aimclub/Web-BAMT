import { useFormik } from "formik";
import { authAPI } from "../../../API/auth/authAPI";
import { IToken } from "../../../API/auth/authInterface";
import SubmitSignin from "../../../components/UI/buttons/SubmitSignin/SubmitSignin";
import TextFieldSignin from "../../../components/UI/textfields/TextFieldSignin/TextFieldSignin";
import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../redux/auth/auth";
import scss from "./authForms.module.scss";
import { validationSchema } from "./authFormsValidator";

const SigninForm = () => {
  const dispatch = useAppDispatch();

  const [signin, { isError, isLoading }] = authAPI.useSigninMutation();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      signin({ email: values.login, password: values.password }).then((res) =>
        dispatch(
          login({
            email: values.login,
            token: (res as { data: IToken }).data.token,
          })
        )
      );
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

      <SubmitSignin type="submit" disabled={isLoading}>
        <span>{isLoading ? "Loading..." : "Sign In"}</span>
      </SubmitSignin>
    </form>
  );
};

export default SigninForm;
