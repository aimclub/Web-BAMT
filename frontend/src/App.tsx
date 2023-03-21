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

  return <AppRouter />;
};

export default App;
