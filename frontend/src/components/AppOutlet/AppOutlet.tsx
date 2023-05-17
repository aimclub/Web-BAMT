import scss from "./appOutlet.module.scss";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import SpinnerProgress from "../UI/progress/spinner/SpinnerProgress";
import Header from "../header/Header";

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
