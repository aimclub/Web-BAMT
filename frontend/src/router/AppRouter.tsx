import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import AppOutlet from "../components/AppOutlet/AppOutlet";
import ModelOutlet from "../components/ModelOutlet/ModelOutlet";
import { useAppSelector } from "../hooks/redux";
import ExperimentPage from "../pages/experiment/ExperimentPage";
import HomePage from "../pages/home/HomePage";
import ModelPage from "../pages/model/ModelPage";
import SamplePage from "../pages/sample/SamplePage";
import RestorePasswordForm from "../pages/signin/forms/RestorePasswordForm";
import SigninForm from "../pages/signin/forms/SigninForm";
import SignupForm from "../pages/signin/forms/SignupForm";
import SigninPage from "../pages/signin/SigninPage";
import { AppRoutes } from "./routes";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <SigninPage />,
    children: [
      { index: true, element: <Navigate to={AppRoutes.SIGNIN} /> },
      { path: AppRoutes.SIGNIN, element: <SigninForm /> },
      { path: AppRoutes.SIGNUP, element: <SignupForm /> },
      { path: AppRoutes.RESTORE_PASSWORD, element: <RestorePasswordForm /> },
      { path: "*", element: <Navigate to={AppRoutes.SIGNIN} /> },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppOutlet />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: AppRoutes.MODEL,
        element: <ModelOutlet />,
        children: [
          { index: true, element: <ModelPage /> },
          { path: AppRoutes.EXPERIMENT, element: <ExperimentPage /> },
          { path: AppRoutes.SAMPLE, element: <SamplePage /> },
          { path: "*", element: <Navigate to="" /> },
        ],
      },
      { path: "*", element: <Navigate to={AppRoutes.HOME} /> },
    ],
  },
];

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return useRoutes(isAuth ? privateRoutes : publicRoutes);
};

export default AppRouter;
