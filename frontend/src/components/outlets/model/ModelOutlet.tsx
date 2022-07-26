import { ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { setModel } from "../../../redux/model/model";
import { AppRoutes } from "../../../router/routes";
import { createModelTheme } from "../../../assets/utils/theme";
import TimeProgreess from "../../UI/progress/TimeProgress.tsx/TimeProgress";

const ModelOutlet = () => {
  const { model } = useParams();
  const dispatch = useAppDispatch();

  if (model !== "geological" && model !== "social") {
    return <Navigate to={AppRoutes.HOME} replace />;
  } else {
    dispatch(setModel(model));
    return (
      <ThemeProvider theme={createModelTheme(model)}>
        <Suspense fallback={<TimeProgreess />}>
          <Outlet />
        </Suspense>
      </ThemeProvider>
    );
  }
};

export default ModelOutlet;
