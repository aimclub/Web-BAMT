import { Suspense } from "react";
// import { authAPI } from "./API/auth/authAPI";
import TimeProgreess from "./components/UI/progress/TimeProgress.tsx/TimeProgress";
// import { useAppDispatch, useAppSelector } from "./hooks/redux";
// import { logout } from "./redux/auth/auth";
import AppRouter from "./router/AppRouter";

const App = () => {
  /*
  // CHECK AUTH
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [checkAuth] = authAPI.useCheckTokenMutation();

  useEffect(() => {
    if (token && user?.email) {
      checkAuth({ token, email: user.email });
    } else {
      dispatch(logout());
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return (
    <Suspense fallback={<TimeProgreess className="loader" />}>
      <AppRouter />
    </Suspense>
  );
};

export default App;
