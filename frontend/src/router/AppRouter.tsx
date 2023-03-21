import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SpinnerProgress from "../components/UI/progress/spinner/SpinnerProgress";

import { useAppSelector } from "../hooks/redux";
import { AppRoutes } from "./routes";

const SigninPage = lazy(() => import("../pages/signin/SigninPage"));

const AppOutlet = lazy(() => import("../components/AppOutlet/AppOutlet"));
const MainPage = lazy(() => import("../pages/main/MainPage"));
const ExperimentPage = lazy(() => import("../pages/experiment/ExperimentPage"));
const SamplePage = lazy(() => import("../pages/sample/SamplePage"));
const TeamPage = lazy(() => import("../pages/team/TeamPage"));

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<SpinnerProgress className="loader" />}>
      <Routes>
        {!isAuth ? (
          <Route path={"*"} element={<SigninPage />} />
        ) : (
          <Route path="*" element={<AppOutlet />}>
            <Route index element={<MainPage />} />
            <Route path={AppRoutes.EXPERIMENT} element={<ExperimentPage />} />
            <Route path={AppRoutes.SAMPLE} element={<SamplePage />} />
            <Route path={AppRoutes.TEAM} element={<TeamPage />} />
            <Route path="*" element={<Navigate to={AppRoutes.MAIN} />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
