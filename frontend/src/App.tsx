import { Suspense } from "react";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    // TODO: style loader
    <Suspense fallback={<div>loading...</div>}>
      <AppRouter />
    </Suspense>
  );
};

export default App;
