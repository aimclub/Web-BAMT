import { Suspense, useEffect } from "react";
import { authAPI } from "./API/auth/authAPI";
import Loader from "./components/loader/Loader";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { logout } from "./redux/auth/auth";
import AppRouter from "./router/AppRouter";

const App = () => {
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
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <AppRouter />
    </Suspense>
  );
};

export default App;
