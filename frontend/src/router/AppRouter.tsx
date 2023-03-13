// import { lazy } from "react";
// import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SpinnerProgress from "../components/UI/progress/spinner/SpinnerProgress";

import { useAppSelector } from "../hooks/redux";
import { AppRoutes } from "./routes";

import RestorePasswordForm from "../components/forms/auth/RestorePasswordForm";
import SigninForm from "../components/forms/auth/SigninForm";
import SignupForm from "../components/forms/auth/SignupForm";
// import { useAppSelector } from "../hooks/redux";
// import { AppRoutes } from "./routes";

const SigninPage = lazy(() => import("../pages/signin/SigninPage"));

const AppOutlet = lazy(() => import("../components/outlets/app/AppOutlet"));
const MainPage = lazy(() => import("../pages/main/MainPage"));
// const HomePage = lazy(() => import("../pages/home/HomePage"));
// const TeamPage = lazy(() => import("../pages/team/TeamPage"));

// const ModelOutlet = lazy(
//   () => import("../components/outlets/model/ModelOutlet")
// );
const ExperimentPage = lazy(() => import("../pages/experiment/ExperimentPage"));
// const ModelPage = lazy(() => import("../pages/model/ModelPage"));
// const SamplePage = lazy(() => import("../pages/sample/SamplePage"));

// const privateRoutes: RouteObject[] = [
//   {
//     path: "/",
//     element: <AppOutlet />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: AppRoutes.TEAM, element: <TeamPage /> },
//       {
//         path: AppRoutes.MODEL,
//         element: <ModelOutlet />,
//         children: [
//           { index: true, element: <ModelPage /> },
//           { path: AppRoutes.EXPERIMENT, element: <ExperimentPage /> },
//           { path: AppRoutes.SAMPLE, element: <SamplePage /> },
//           { path: "*", element: <Navigate to="" /> },
//         ],
//       },
//       { path: "*", element: <Navigate to={AppRoutes.HOME} /> },
//     ],
//   },
// ];

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<SpinnerProgress />}>
      <Routes>
        {!isAuth ? (
          <Route path={AppRoutes.MAIN} element={<SigninPage />}>
            <Route index element={<Navigate to={AppRoutes.SIGNIN} />} />
            <Route path={AppRoutes.SIGNIN} element={<SigninForm />} />
            <Route path={AppRoutes.SIGNUP} element={<SignupForm />} />
            <Route
              path={AppRoutes.RESTORE_PASSWORD}
              element={<RestorePasswordForm />}
            />
            <Route path="*" element={<Navigate to={AppRoutes.SIGNIN} />} />
          </Route>
        ) : (
          <Route path={AppRoutes.MAIN} element={<AppOutlet />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoutes.EXPERIMENT} element={<ExperimentPage />} />
            <Route path="*" element={<Navigate to={AppRoutes.MAIN} />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
