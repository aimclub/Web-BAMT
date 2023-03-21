import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import SpinnerProgress from "../UI/progress/spinner/SpinnerProgress";
import scss from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={scss.root}>
      <Header />
      <main className={scss.main}>
        <Suspense fallback={<SpinnerProgress className={scss.loader} />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default AppOutlet;
